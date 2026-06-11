def calculate_hybrid_score(rule_score: float, ml_score: float) -> float:
    """
    Calculates the final EcoScore using a 70/30 Hybrid strategy.
    """
    final_score = (rule_score * 0.7) + (ml_score * 0.3)
    return round(max(0, min(100, final_score)), 2)

def calculate_confidence(missing_features_count: int, total_features: int) -> float:
    """
    Calculates confidence score 0-100% based on feature completeness.
    """
    completeness = (total_features - missing_features_count) / total_features
    # Base confidence is 50%, scales up to 95% based on completeness
    confidence = 50 + (completeness * 45)
    return round(confidence, 2)

def get_grade(score: float) -> str:
    if score >= 90: return "A+"
    if score >= 80: return "A"
    if score >= 70: return "B"
    if score >= 60: return "C"
    if score >= 40: return "D"
    return "E"
