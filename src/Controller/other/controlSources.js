/*
    Fomrula should theoretically change whenever a road is added
    Is that it?

    Sources have upgrade System
        RCL1 =>
            One Spot = 1/0/2 => 1/1/0 * formula
            Two Spot = 1/0/2 => 1/1/0 * formula
            Three Spot => 1/0/1 => 1/1/0 * formula

        RCL2 =>
            1/0/5 => x=1-3 x/x/0 * formula
                Recycle old creeps
            2/0/5 should be another variant
                Distance
                Current e/t
        RCL =>
            2-4/1/8 //Gives us enough time for a container building
        Level1 = 1/0/2 => 1/1/0 => 1/1/0
        RCL1 = 1/0/2 => 1/1/0 => 1/1/0 => 1/2/0 => 1/1/0




 Do we loop over sources or rooms,
 Each source needs to make sure it has harvesters and courier
    They will take care of it from there
 Loop Over Rooms
    -Still keeps room logic inside it
 Loop over Sources
    -Check if active
        -yes
            Make sure harvesters and couriers arent dead / dying
    -periodically
        -Generate an upgrade option list for decided
            Include Deletion ** Future Release

        -yes
            MaxEnergyPerTick:
            AvgHarvest: WORK * 2                         (Assuming we replace before death)
            AvgCarry:  CARRY * 50 / (distance * 2)       (Assuming 1mv/t)

            while true
                If   Avg Carry + relax < Avg Harvest:
                    Increase Carrying

                Elif Avg Carry > Avg Harvest + relax:  **FUTURE OPERATION
                    Fix one

                Elif Avg Harvest < Max Energy:
                    If hasMoveAvailableSpots:
                        Increase Harvesting
                Break

            Use Priority in creep to decide which one to do
        -no : generate a cost formula for decider


   Now that we are talking about priority,
   If a spawn sends an order for creeps, but then disaster hits. How do we move up all harvesters etc..

   If we hard reset go to coldStart
   Sometimes, we want a softReset,

   ColdStart = Starting from scratch alone

   SoftReset =  Scramble existing units to energy production to fix problem

   HardReset = Starting from scratch alone, request units from other rooms if available.

*/