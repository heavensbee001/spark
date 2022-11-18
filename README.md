# Spark

You can watch de demo video [here](https://www.youtube.com/watch?v=ViNDqrweIms),
and test the Spark application [here](https://spark-protocol.vercel.app/)

## Inspiration

Do you know where all the electricity you consume comes from? What's the impact on the planet of your energy consumption? People are very disconnected from their energy consumer habits.
Also, big electricity providers are struggling to offer different products tailored to the needs and beliefs of their customers.

## What it does

Spark is the first protocol that allows consumers to decide which electricity source they want to power their homes. With live data on price and CO2 emissions for each electricity source, customers can personalize their energy consumption.
Every day, the protocol will update sources generated electricity and user energy balances according to their preferences.

## How I built it

The contract is built on **Polygon**. Every day, using **Chainlink Automation** it will trigger the API calls simulating the electricity meters measures and the source energy production. (The API is a **netlify serverless** function).

On the front-end side, I've built a **NextJS** application with Wagmi and RainbowKit libraries. I personally enjoy a lot working with **TailwindCSS** and giving a unique style to my projects.

All the sources data displayed is stored on **IPFS**.

## The project

You can find the solidity files in the `/spark-contracts` folder
You can find the Front end NextJS application in the `/spark-front` folder
You can find the IPFS jsons and the netlify funcions in the `/spark-serverless` folder
