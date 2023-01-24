---
layout: blog-post.liquid
title: Experimentation reading list
description: Resources for learning more about controlled experimentation
date: 2023-01-24
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
  - experimentation
---

# Introduction

During my time on the Growth team at Noom, I've had to learn a lot about online controlled experimentation. I've put together most of the public resources I've come across into this document.

If you're brand new to online controlled experimentation, I high recommend starting with [Trustworthy Online Controlled Experiments : A Practical Guide to A/B Testing](https://experimentguide.com/). Its a detailed guide on the experimentation landscape. It was a must-read for every member of my team, and was known as the "Experimentation Bible".

# Whitepapers

- Overlapping Experiment Infrastructure: More, Better, Faster Experimentation [36500.pdf](36500.pdf)
- Online Controlled Experiments at Large Scale [2013 controlledExperimentsAtScale.pdf](2013_controlledExperimentsAtScale.pdf)
- Controlled experiments on the web: survey and practical guide [controlledExperimentDMKD.pdf](controlledExperimentDMKD.pdf)
- Democratizing online controlled experiments at [Booking.com](http://booking.com/)[1710.08217.pdf](1710.08217.pdf)
- Seven Rules of Thumb for Web Site Experimenters[2014 experimentersRulesOfThumb.pdf](2014_experimentersRulesOfThumb.pdf)
- SQR: Balancing Speed, Qality and Risk in Online Experiments[1801.08532.pdf](1801.08532.pdf)
- Growth Book Stats Whitepaper[GrowthBookStatsWhitepaper-2021 (1).pdf](<GrowthBookStatsWhitepaper-2021_(1).pdf>)
- [Success Stories from a Democratized Experimentation Platform](https://arxiv.org/abs/2012.10403#)
  - Notes:
    - Netflix experimentation platform
    - Interesting: Netflix uses R/Python notebooks so people can contribute reports, statistical methodologies, and metrics.

# Books

- [`Trustworthy Online Controlled Experiments : A Practical Guide to A/B Testing`](https://experimentguide.com/)

# Videos

- [https://www.youtube.com/watch?v=qtboCGd_hTA](https://www.youtube.com/watch?v=qtboCGd_hTA)

# Statistics

- [https://www.youtube.com/watch?v=AJX4W3MwKzU](https://www.youtube.com/watch?v=AJX4W3MwKzU)
  - Notes:
    - Frequentest
      - Popular 100 years ago
        - Data was expensive to gather back then.
      - Fixed sample size testing
    - Peeking problem
      - Continuously monitor results dashboard
      - Adjust test length in real time (Adaptive sample size testing)
      - **Peeking can dramatically inflate false positives.**
      - Intuition
        - Sample size specifies a point in time, doesn't say anything about what happens between the start of the experiment and when you hit sample size.
        - High chance of significant result on the way to sample size may bias whether we keep the test running or not.
        - _If you wait long enough, there is a high chance of an eventually inconclusive result looking "significant" along the way!_

## Experimentation Platform

- [Experimentation Platform - Microsoft Research](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/)
- [Building our Centralized Experimental Platform | Stitch Fix Technology - Multithreaded](https://multithreaded.stitchfix.com/blog/2019/07/30/building-centralized-experimental-platform/)
  - Notes:
    - They have analytics automated
    - Not a lot of details in this blog post
- [Meet Wasabi, an Open Source A/B Testing Platform](https://medium.com/intuit-engineering/open-sourcing-wasabi-the-a-b-testing-platform-by-intuit-a8d5abc958d)
  - Wasabi not under active development
- [Scaling Airbnb's Experimentation Platform](https://medium.com/airbnb-engineering/https-medium-com-jonathan-parks-scaling-erf-23fd17c91166)
  - Notes:
    - Uses Airflow for meteics
      - ERF runtime from 24 hours to 45 minutes
    - Useful article to learn about how they do data processing
- [It's All A/Bout Testing](http://techblog.netflix.com/2016/04/its-all-about-testing-netflix.html)
  - Notes:
    - Targeting and allocation
      - There is one more topic to address before we dive further into details, and that is how members get allocated to a given test. We support two primary forms of allocation: batch and real-time.
      - Batch allocations give analysts the ultimate flexibility, allowing them to populate tests using custom queries as simple or complex as required. These queries resolve to a fixed and known set of members which are then added to the test. The main cons of this approach are that it lacks the ability to allocate brand new customers and cannot allocate based on real-time user behavior. And while the number of members allocated is known, one cannot guarantee that all allocated members will experience the test (e.g. if we’re testing a new feature on an iPhone, we cannot be certain that each allocated member will access Netflix on an iPhone while the test is active).
      - Real-Time allocations provide analysts with the ability to configure rules which are evaluated as the user interacts with Netflix. Eligible users are allocated to the test in real-time if they meet the criteria specified in the rules and are not currently in a conflicting test. As a result, this approach tackles the weaknesses inherent with the batch approach. The primary downside to real-time allocation, however, is that the calling app incurs additional latencies waiting for allocation results. Fortunately we can often run this call in parallel while the app is waiting on other information. A secondary issue with real-time allocation is that it is difficult to estimate how long it will take for the desired number of members to get allocated to a test, information which analysts need in order to determine how soon they can evaluate the results of a test.
- [Twitter experimentation: technical overview](https://blog.twitter.com/engineering/en_us/a/2015/twitter-experimentation-technical-overview)
  - Notes:
    - Uses feature flags
    - Pretty unremarkable
- [Zalando Engineering Blog - Experimentation Platform at Zalando: Part 1 - Evolution](https://engineering.zalando.com/posts/2021/01/experimentation-platform-part1.html)
  - Notes:
    - Uses craw/walk/run phrasing a-la Ronnie K
    - Their system allows for staged rollouts
- [Under the Hood of Uber's Experimentation Platform](https://eng.uber.com/xp/)
- Notes:

  - Good details, screenshots of their XP.
    > Broadly, we use four types of statistical methodologies: fixed horizon A/B/N tests (t-test, chi-squared, and rank-sum tests), sequential probability ratio tests (SPRT), causal inference tests (synthetic control and diff-in-diff tests), and continuous A/B/N tests using bandit algorithms (Thompson sampling, upper confidence bounds, and Bayesian optimization with contextual multi-armed-bandit tests, to name a few). We also apply block bootstrap and delta methods to estimate standard errors, as well as regression-based methods to measure bias correction when calculating the probability of type I and type II errors in our statistical analyses.
  - The XP detects major issues during analysis:
    - Sample size imbalance (Sample size ratio in control and treatment group)
    - Flickers (Users that have switched between control and treatment groups)
  - They do data pre-processing:
    - Outlier detection using a clustering algorithm to detect and remove outliers
    - Variance reduction using CUPED Method
    - Remove pre-experiment bias using difference in differences to correct pre-experiment bias between groups.
  - Sequential testing

    This is very similar to the circuit breaker system we were interested in building.

    > One use case where a sequential test comes in handy for our team is when identifying outages caused by the experiments running on our platform. We cannot wait until a traditional A/B test collects sufficient sample sizes to determine the cause of an outage; we want to make sure experiments are not introducing key degradations of business metrics as soon as possible, in this case, during the experimentation period. Therefore, we built a monitoring system powered by a sequential testing algorithm to adjust the confidence intervals accordingly without inflating Type-I error.

    > Using our XP, we conduct periodic comparisons about these business metrics, such as app crash rates and trip frequency rates, between treatment and control groups for ongoing experiments. Experiments continue if there are no significant degradations, otherwise they will be given an alert or even paused. The workflow for this monitoring system is shown in Figure 6, below:

  - Bandit aka Continuous Experiments
    - Bandit is used at Uber for:
      - Content optimization
      - Spend optimization
      - Hyper-parameter tuning for learning models.
      - Automated Rollouts

- [Building an Intelligent Experimentation Platform with Uber Engineering](https://eng.uber.com/experimentation-platform/)

  - Notes:

    - Uber uses their XP to do staged rollouts.
    - On metric computation

    >     The new analysis tool does not pre-compute the data of the metrics, which cut down on our data storage spend and reduced our analysis generation time. Now, when the data is ready for analysis, we use a [SQL](https://en.wikipedia.org/wiki/SQL) query file to generate metrics on the fly whenever people make a request on the WebUI. After that, we use [Scala](https://www.scala-lang.org/) as our service engine to compute the probability ([p-value](https://en.wikipedia.org/wiki/P-value)) that the treatment group mean is significantly different than the control group mean, determining if the experiment reached the target sample size.

- [In-house experimentation platforms](https://www.linkedin.com/pulse/in-house-experimentation-platforms-denise-visser/)
  - Cool list of various companies experimentation platforms.
- [ExPlat: Automattic's Experimentation Platform](https://data.blog/2021/03/16/explat-automattics-experimentation-platform/)
  - Notes:
    - System is called Abacus
    - [Open source](<[https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjk5IWj04b0AhWBpnIEHZu0AOoQFnoECAUQAQ&url=https%3A%2F%2Fgithub.com%2FAutomattic%2Fabacus&usg=AOvVaw0Z4geVG-mMz1vxvOSMB15A](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjk5IWj04b0AhWBpnIEHZu0AOoQFnoECAUQAQ&url=https%3A%2F%2Fgithub.com%2FAutomattic%2Fabacus&usg=AOvVaw0Z4geVG-mMz1vxvOSMB15A)>)
