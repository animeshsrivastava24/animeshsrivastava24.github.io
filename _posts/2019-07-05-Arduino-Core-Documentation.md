---
layout: post
title: Subset Generation Problem
---

# Welcome to the Arduino-Core-Documentation wiki!
![](https://img.shields.io/badge/Documentation-Draft%20Version-brightgreen.svg)
![](https://img.shields.io/badge/Documentation-Under%20Build-brightgreen.svg)
![](https://img.shields.io/badge/Contribution-Welcomed-brightgreen.svg)

## Table of Content
1. [Introduction to Arduino Core](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/1.-Introduction-to-Arduino-Core)

2. [Introduction to Source files and the Building Process](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process.)
   1. [General Source Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#general-source-files)
   2. [Port-related Source Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#port-related-source-files)
       * [Digital Port Source File](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#1digital-port-source-file)
       * [Analog Port Source File](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#2analog-port-source-file)
       * [Other Port Related Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#3other-port-related-files)
   3. [Timers/Timing Source Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#timerstiming-source-files)
   4. [Hardware Serial Source Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#hardware-serial-source-files)
   5. [Wiring-related Source Files](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#wiring-related-source-files)
   6. [Others](https://github.com/animeshsrivastava24/Arduino-Core-Documentation/wiki/2.-Introduction-to-Source-files-and-the-Building-Process./_edit#others)

3. Custom Core Design JSON File Creation

4. Architecture Configuration File: Description
* platform.txt
* boards.txt
* programmers.txt.

5. Building Process: Steps and Workflow
* Compilation
* Core Archive File Creation
* Linking Process
* Hex File Generation
* Binary Sketch Computation
* Preprocessing

6. Arduino Core Testing
* Online Method - JSON Url Creation.
* Offline Method - Addition of Arduino Core to the IDE.
