import GroupDelivery from '../../../models/GroupDelivery';
import { DeliveryClusterEngine } from './delivery-cluster-engine.service';
import { DeliveryCarbonService } from './delivery-carbon.service';
import { VehicleType } from '../types';

export class GroupDeliveryService {
  /**
   * Evaluates pending orders in an area and creates delivery clusters.
   * Typically run as a cron job, but exposed here as a service.
   */
  static async createClusters(pendingOrders: any[], radiusKm = 2) {
    const clusters = DeliveryClusterEngine.generateClusters(pendingOrders, radiusKm);
    const createdGroups: any[] = [];

    for (const cluster of clusters) {
      if (cluster.waypoints.length > 1) { // Only save if it actually grouped multiple people
        
        // Calculate trips avoided and carbon saved
        const tripsAvoided = cluster.waypoints.length - 1;
        
        // Rough estimate: Each trip avoided saves about 3km of driving
        const carbonSaved = DeliveryCarbonService.calculateEmissions(
          tripsAvoided * 3, 
          VehicleType.DIESEL_VAN, 
          2 // 2kg avg package weight
        );

        const newGroup = await GroupDelivery.create({
          clusterId: cluster.clusterId,
          hubLocation: { type: 'Point', coordinates: cluster.hubLocation },
          radiusKm,
          deliveryDate: new Date(Date.now() + 86400000), // Tomorrow
          waypoints: cluster.waypoints,
          totalCarbonSaved: carbonSaved.baselineEmissionsKg, 
          tripsAvoided,
          participants: [], // Populated later as users opt-in
        });

        createdGroups.push(newGroup);
      }
    }

    return createdGroups;
  }

  /**
   * Allows a user to actively join an existing open cluster.
   */
  static async joinGroupDelivery(groupId: string, userId: string, orderId: string, lat: number, lng: number) {
    const group = await GroupDelivery.findById(groupId);
    if (!group) throw new Error('Group delivery not found');
    if (group.status !== 'open') throw new Error('Group delivery is locked or completed');
    if (group.participants.length >= group.maxParticipants) throw new Error('Group is full');

    group.participants.push(userId as any);
    group.waypoints.push({ order: orderId as any, location: { type: 'Point', coordinates: [lng, lat] } });
    
    group.tripsAvoided += 1;
    group.totalCarbonSaved += DeliveryCarbonService.calculateEmissions(3, VehicleType.DIESEL_VAN, 2).baselineEmissionsKg;
    
    await group.save();
    return group;
  }
}
