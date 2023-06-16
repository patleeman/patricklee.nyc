---
layout: blog-post.liquid
title: Moving onto a new chapter
description:
date: 2023-06-03
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
  - career
---

# Moving onto a new chapter

I left Noom on June 5th, 2023 after 5 years. I wanted to write about a few of the highlights of my time at Noom, why I'm leaving, and where I'll be going.

I never thought Noom would take off the way it did. When I joined the company in 2018, it was small and recovering from its last round of layoffs. The company hadn't found product-market fit yet. We were scrappy and fighting to survive. I joined two other engineers on the Growth team and we went head first into rapid experimentation. We found product-market fit in 2019 and little did I know the next few years would be some of the most intense periods of my working life.

A few highlights:
- I had the opportunity to build and architect an experimentation platform for Noom.com.
- I helped scale the growth team from 3 engineers to 30 at our largest in just 2 years.

A few reasons I'm moving on:
- I've battled burnout several times, a lot of it was due to my role as an Engineering Manager.
- The company has grown up and has reached a stage where I feel less effective.

# Highlights

## The Meristem Experimentation Platform

We built our own experimentation system instead of buying something off the shelf. I know, I know. We re-invented the wheel! It seemed like the right decision to make at the time. To understand the solution we came up with, its important to understand the context in which we made those decisions:

1. We ran experiments using feature flags.
2. We were a very small team with a lot of product managers per engineer. Our PM/Eng ratio typically hovered around 1.5. That's 1.5 Engineers per Product Manager! To put that into context, for example, Netflix has a ratio of about 12! That's 12 engineers per 1 PM!
3. PMs were responsible for creating a hypothesis for improving Noom.com conversion rates, creating the specification, and project managing the experiment, QAing and doing data analysis afterwards. They typically had very full workloads! Our PMs did *everything*!
4. Engineers were in charge of implementing experiments and working with PMs to right size the amount of work for an experiment based on the ROI of the feature. Engineers are also in charge of maintenance of noom.com
5. The team prioritized experiment velocity (to  a fault). A base expectation was that each engineer would create and launch around one experiment per week (depending on the difficulty of implementation). This meant that there was not a lot of time for things like cleanups or investing into the infrastructure due to the pressure to run more experiments and lack of "slack" on the engineering side to devote to tech debt cleanups.

These constraints meant that we were trying to experiment very quickly and that all available engineering time was typically devoted to building and experimenting with new features. By using feature flags, we were incurring technical debt for every experiment we ran. Not only that, but feature flags typically interacted in difficult to predict ways and required expensive processes to get merged and tested for every potential experiment we wanted to run. This was *a lot* of overhead!

My teammates Sumin and Hubert came up with a novel idea: "What if we could use Git to manage our experiment variation branches"? We'd be able to throw out the code for failed experiments easily since roughly 9 out of every 10 experiments were considered failures. Then we'd only merge code into our codebase that we knew we'd wanted to keep. By not having to merge code into our main codebase for every experiment, we'd save ourselves a lot of effort reviewing the code, testing the code, maintaining the code, and the removing it when the experiment ultimately failed. We were optimizing for experiment velocity while heavily constrained by engineering bandwidth.

I was put in charge of the project and built out an [initial version](https://medium.com/noom-engineering/the-growth-machine-how-noom-runs-365-landing-page-experiments-per-year-1e098ea33354). Surprisingly, it worked but we hit scaling issues pretty quickly. We re-built the system with a different architecture and [it ended up working really well for us](https://medium.com/noom-engineering/how-noom-uses-technology-to-herd-the-experimental-cats-256d3713c761). The system isn't without its flaws that we've had to work around. If I were to build another experimentation system today, I'd probably choose somthing else, but for our constraints it worked well.

## Scaling the team and going into management

I also started to transition into engineering management. I went from a mid-level Individual Contributor (IC) to Tech Lead, to Tech Lead Manager and finally to Senior Tech Lead manager. As I progressed, my focus shifted from technology to people and teams and although my title was Tech Lead Manager, I was effectively an Engineering Manager by the end of my time at Noom.

I made a lot of mistakes as a manager and I often describe management as feeling like you have an infinite number of ways to fail and very few ways to succeed. It's a stressful and thankless job with very long iteration cycles. I still don't think of myself as a particularly good manager, and I'm often haunted by an incessent feeling that I was letting my teams down.

I'd say my biggest accomplishments as a manager at Noom were the people I'd help grow and mentor who would go on to succeed themselves. I don't look back at my time as a manager and remember the metrics we helped move, or the features we shipped, or congratulations from my bosses. Its the people that looked to me for advice, that I helped promote, that I helped get recognition that I got the most satisfaction from.

By and far my biggest gripe with management are the administrative parts like promotion packets, performance reviews, Performance Improvement Plans (PIPs), Objectives and Key Results (OKRs), etc. As Noom went from a small startup to a larger and more mature company, there was more and more priority placed on standardizing and calibrating across the company. I've heard these are typical growing pains that companies around Noom's size faced, but I can't confirm or deny this posit since Noom is the only hyper growth company I've worked for.

When Noom rolled out a new performance review system that tied performance to compensation, I struggled a lot with this change. The goal was to reward and recognize high performers, which sounds like a really great goal. You want to make sure that those teammates that are bringing a lot of value to the team are recognized and rewarded. In practice howwever, as a manager it feels really shitty to have to discern who is deserving of higher raises or bonuses based on indivdual performance when you're actually trying to optimize for your team performing well. How do you gauge whether somebody is actually performing at a level above and beyond their own? We fell back to our competency matrix, which had a few main areas but also left a lot of room for interpretation. Not every engineer fit into this template, so some did extraordinarily well in some areas and less well in others. Some also did work on areas not covered by the matrix (like documentation or organizing team events). We did raise these issues and they did eventually get addressed, but it was an extremely painful transition.

Another thing I noted during my time moving from an extremely small and fast paced team to a large team was that focus and incentives shifted from the organization to individuals. What I mean by this is that as we grew, us managers became much more aware of the need to promote people, which meant we were incentivized to ensure engineers were checking off certain boxes to be able to promote them. A stark contrast from when the team was small and scrappy, we just worked towards a pure goal of keeping the company alive. As we grew, this goal was de-emphasized and a lot more focus was placed on ensuring people were happy, growing, and productive. I don't necessarily think this is a bad thing, but it was certainly not something I was prepared for.

Finally, I look back now and I realize how difficult it is to learn to be a manager as a group of first time managers with little support. I wish we had more experienced engineering managers to help guide and teach us as we went, because when we finally got a manager with deep Engineering Management experience, the experience was a lot more pleasant. However it was too little, too late.

I'd love to try engineering management again in the future, now that I've learned what the job entails and have a [network](https://randsinrepose.com/welcome-to-rands-leadership-slack/) of other engineering managers to learn from. But maybe I'll try working as an IC for a while first.

# Why I'm moving on

I burnt out several times during my time at Noom. I'm pretty self-motivated and when I'm invested, I go hard. This meant that I would find myself working really hard and burning out, or being heavily invested in something at work and burning out if I lose agency or am required to "disagree and commit". This cycle of burning out is expensive on my psyche, and over time it manifests in negative thinking. I noticed that I'm sliding into this cycle so the best way for me to reset is to move on to a new role, taking these lessons with me.

I've also done a lot of introspection these last few months and realize that as Noom grew, it needed more process in lieu of the higher bandwidth communication that was easy when the company was 50 people. As organizations grow, you need structure to ensure people are working towards the same goal, this unfortunately means that companies undergo growing pains where people like me that joined early on are required to change and adapt to the new environment. The skills that make an individual successful at a small company are very different from the skills necessary at a larger company. The incentive structures are very different. Typically at startups, you'd find a lot of intrinsically-motivated people, working towards a goal. This pool of intrinsically-motivated people is exceptionally small, and as a company grows it needs to add extrinsically-motivated people to fill the ranks. Extrinsically motivated people respond to a very different incentive structure that can be at odds with intrinsically-motivated people.

What I realize is that as Noom grew, I often felt at odds with the cultural shift the company underwent. I don't know if I'm just better suited to smaller companies, or was unable to adapt to the cultural shift at the company, but I often felt at odds with the leadership and processes that were put in place to support a more mature company. I don't think its good or bad, just is.

# Next steps

I'm excited to announce that I'll be moving back to an Individual Contributor (IC) role at [Clockwise](https://www.getclockwise.com/). They have a really amazing piece of technology that helps people maximize their time and abstract away the really annoying task of managing your calendar. I'm really excited to be joining the Growth team and working on projects like [Clockwise AI](https://www.getclockwise.com/ai).



