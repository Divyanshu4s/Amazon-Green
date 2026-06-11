export class DeliveryClusterEngine {
  /**
   * Mocks a clustering algorithm (like K-Means or DBSCAN) to group nearby delivery locations.
   */
  static generateClusters(orders: any[], radiusKm: number) {
    const clusters: any[] = [];
    const unclustered = [...orders];

    // Extremely basic greedy clustering heuristic for simulation
    while (unclustered.length > 0) {
      const coreOrder = unclustered.shift();
      if (!coreOrder) break;

      const cluster = {
        clusterId: `CL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        hubLocation: coreOrder.location, // Assuming the first point is the center for simplicity
        waypoints: [{ order: coreOrder.orderId, location: coreOrder.location }],
      };

      // Find other points within radius
      for (let i = unclustered.length - 1; i >= 0; i--) {
        const potentialPoint = unclustered[i];
        const dist = this.calculateDistance(coreOrder.location, potentialPoint.location);
        
        if (dist <= radiusKm) {
          cluster.waypoints.push({ order: potentialPoint.orderId, location: potentialPoint.location });
          unclustered.splice(i, 1);
        }
      }

      clusters.push(cluster);
    }

    return clusters;
  }

  private static calculateDistance(origin: [number, number], dest: [number, number]) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(dest[1] - origin[1]);
    const dLng = toRad(dest[0] - origin[0]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(origin[1])) * Math.cos(toRad(dest[1])) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
