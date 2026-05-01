# REDLINE
## Overview
REDLINE is a top down infinite driving game built entirely with vanilla JavaScript and HTML5 Canvas. You play as a driver on a procedurally generated road that never ends. The goal is simple — survive as long as you can while dodging oncoming traffic, avoiding road obstacles and managing your fuel.

The road is not the only thing that keeps changing. The scenery around you shifts between summer, winter and desert environments as you drive giving the run a fresh look every time. NPC cars spawn in both lanes with their own speeds — some will overtake you, some will come head on. Obstacles like cones, barricades and potholes are scattered across the road and hitting them costs you a heart.

Fuel is a constant pressure. Your tank drains as you drive and drains faster if you go offroad. Gas stations spawn along the road at increasing intervals — pull into one to refill. Time your refuel right and keep your tank below 30% before hitting the station to earn a bonus score on top.

You have 3 hearts. Lose them all from collisions or going offroad too long and it is game over. Your score is tracked in real time based on your speed and saved locally so you always have a best to beat.


> - Don't Ride offroad too long else you lose a heart
> - Score System : Try to get higher score. Score alone will motivate you. The speeder you move the more The score will be
> - Refill Your car from the gas station it will get spawned and you need to drive your car on top of it to refill
> - Refill Your car when your fuel meter is less than 30% to earn bonus score in the run

## Controls
| key | Action |
| ----| -------|
| `Arrow Up` / `w` | Accelerate |
| `Arrow Down` / `s` | Deaccelerate / brake|
| `Arrow Right` / `d` | Move Right |
| `Arrow Left` / `a` | Move Left |

## Objective
 Survive as Long as Possible there is no fixed objective ride until you feel like it.

## About Game
 - The game features a procedural road and scene generation so there is no end to the game.
 - The NPC traffic and Obstacles are spawned dynamically so it doesn't feel static.
 - The game offers collison detecting using SAT algorithm.
 - Gas station to refill your gas tank.
 - Health system with Invinsibility frames after taking damage.
 - When Selecting 2+ scenes it will randomly spawns them across the Start Page and in-game.
 - Score gets added as you drive faster = more score and when refueling if your fuel meter is below 30% you will get a 500 bonus score added.

## Tech Stack
- JavaScript(Vanilla)
- HTML 5 Canvas
- CSS(Vanilla)

## How to Clone

```bash 
git clone https://github.com/VIKRAM2605/racing_car_game.git

```
Start With `Live Server` Or Open The File In The `Browser`

## Planned Features
- MultiPlayer
- Shop to buy skins / upgrades
