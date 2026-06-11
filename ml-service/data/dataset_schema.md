# Dataset Schema

This dataset is used to train the Machine Learning EcoScore Predictor.

## Columns

| Column Name | Type | Description |
|-------------|------|-------------|
| `product_name` | String | Name of the product (Identifier) |
| `category` | String | Product category (e.g., Electronics, Home) |
| `material_type` | String | Primary material (e.g., Recycled Metal, Single Use Plastic) |
| `recycled_content_percent` | Float | Percentage of recycled materials (0-100) |
| `recyclable` | Integer (0/1) | Whether the product is recyclable |
| `reusable` | Integer (0/1) | Whether the product is reusable |
| `repairable` | Integer (0/1) | Whether the product is repairable |
| `lifespan_years` | Float | Expected product lifespan in years |
| `warranty_years` | Float | Provided warranty in years |
| `reuse_cycles` | Integer | Estimated number of reuse cycles |
| `packaging_type` | String | Type of packaging (e.g., Compostable, Mixed Plastic) |
| `plastic_percentage` | Float | Percentage of plastic in packaging (0-100) |
| `shipping_distance` | Float | Estimated shipping distance in km |
| `energy_saving` | Integer (0/1) | Does the product save energy? |
| `water_saving` | Integer (0/1) | Does the product save water? |
| `waste_reduction` | Integer (0/1) | Does the product reduce waste? |
| `seller_score` | Float | The sustainability score of the seller (0-100) |
| `eco_score` | Float | The TARGET label to predict (0-100) |
