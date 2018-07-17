module.exports = () => {

};

/*
    Worker - 16/16/16
    Carry  - 16/32
    Harv   - 10/5/1
    10-30-10  3000 Energy in 50  Ticks, Can Create  8 Roads, Mv 2/t
    15-15-20  3000 Energy in 100 Ticks, Can Create 16 Roads,
    Need
    10 Work, 5 Move, 1 Carry
        Allows Building Of Container

    Once Every 3000 Ticks, all harvesters go into build mode,
    Builders should delete roads below a certain threshold

    Road 8.3x Efficiency Building
         Build  - 60 Energy  - 300
         Repair - 500 Energy - 2500
         50,000 Ticks, .1/s  100 Energy / 300 Ticks, If 4 Creeps, Then Every 3000 Ticks
         50,000 Ticks  .5/s
         8.3x Efficient
    Container 25x Efficiency Building

    Towers Can Repair All Roads in



    Build Container Inside
         1000 / (25kt * 10e/t) 99.6% Efficiency
    Build Container Outside
         1000 / (5kt * 10e/t)  98% Efficiency

    Repair Container Inside
        1/t, 1 / 10 = 90% Efficiency
    Repair Container, Outside
        5/t, 5 / 10 = 50% Efficiency

     Drop Farming 3000 Pickup
        16 Work, 32 Carry, 96 Dropped, 97% Efficiency
     Drop Farming 1000 Pickup
        16 Work, 32 Carry, 48 Drop, 98.5% Efficiency

    Internal Carrying
    16 Move, 32 Work  =  1mv/t
    10 Move, 40 Work  =  2mv/t
    10 Move, 20 Work, 20 Carry

    //Every 100 Ticks, Assign a Builder, Builder will transform into previous role after it fixes everything
    Actors
    ------------
    Creep
        Harvest
            //
        Store
        Upgrade
        Repair
             //20 Work = 400 Repair / 40 Energy / Tick = 1000 Storage = 25 Ticks = 10k Healing
             //30 Work = 600 Repair / 60 Energy / Tick = 500 Storage  = 8.25 Ticks = 5k Healing
        Build
            //20 Work = 100 Build / 20 Energy / Tick = 1000 Storage = 50 Ticks = 5000 Points
         ReserveController
             -16 Move, 32 Claim, 1/ptRoad     161 = 4991
             -10 Move, 40 Claim, 2/pt Road    128 = 4992
             - 7 Move, 42 Claim, 3/pt Road    122 = 5000
             -161 Steps to Get Room to 4991
             -Lets give 40 ticks to get to next room
             -1500 Ticks * 7.5 Rooms * 1.5 Avg Srcs * 10 energy / tick
             -8000 Energy Cost, 562,500 Potential Energy

        Road      | 300 Cost, .1 Maintenance
        Container | 5000 Cost, 1 IR Maintenance, 5 OR Maintenance
        Extension | 3000 Cost
        Spawn     | 15,000 Cost
        Tower     | 5,000 Cost

     Structure Types
     --------------
     Extension - Should be built near sources
        3000 Cost
     Container - Store Resources
        5000 Cost
        250,000 Hits, 5000 hit
     Link
        5000 Cost
     Road
        300 Cost, 25,000 HP
        1000 / 100t, CreepStep is 1/body Part
        Repair is 20 hp / 2 energy / tick
     Storage
        30,000 Cost
     Spawn
        15,000 Cost
     Tower
        5,000 Cost
        10 Energy / Action
        800 Hits at 5, 200 hits at 20
     ConstructedWall
     Source
     Rampart

 */
/*
     -1    ERR_NOT_OWNER
     -4    ERR_BUSY  being spawned
     -6    ERR_NOT_ENOUGH_RESOURCES
     -7    ERR_INVALID_TARGET  wont work with block
     -8    ERR_FULL
     -9    ERR_NOT_IN_RANGE
     -10   ERR_INVALID_ARGS
     -12   ERR_NO_BODY
     -14   ERR_RCL_NOT_ENOUGH
           ERR_TIRED
           ERR_NO_PATH
 */

/*
    Spawn
    ------------------
    300 Base, 50+ per extension
    BodyParts * 3 ticks
    MaxCreep = 50
    5000 cost, 1000 seconds

    Extension
    -----------------
    3000 Cost, 600 seconds w/ One Body Part

    Time
    ---------------
    Game.time % 25 != 0,  check every 25 ticks
 */

/*



 */