class ParachuteSytem:
    def deploy(speed, altitude):
        if speed <0 or altitude <0:
            raise ValueError("Invalid speed or altitude")
        if  altitude < 150:
            return "Too low to deploy"
        else:
            return "Parachute deployed"
        
    def calculate_landing_impact(speed, weight):
        return speed * weight/10
    
    def is_safe_landing(speed,weight):
        return ParachuteSytem.calculate_landing_impact(speed, weight) < 50
    