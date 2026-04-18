import unittest
from parachute import ParachuteSytem



class TestParachuteSystem(unittest.TestCase):

    # Testing deploy function with negative speed
    def test_deploy_negative_speed(self):
        with self.assertRaises(ValueError):
            ParachuteSytem.deploy(-1, 100)

    # Testing deploy function with correct speed and altitude
    def test_deploy_successful(self):
        self.assertEqual(ParachuteSytem.deploy(10, 300), "Parachute deployed")
    

    # TODO 1: Test deploy function with too low altitude
    # Call deploy(30, 100) and assert that the result is "Too low to deploy".

    # TODO 2: Test calculate_landing_impact function
    # calculate the landing impact using speed =50, and altitude = 100 and assert that the result is 500.

    # TODO 3: Test is_safe_landing function


if __name__ == '__main__':
    unittest.main()