---
layout: blog-post.liquid
title: "Tech Equity: The hard way"
description: "Learn from my mistakes"
permalink: "blog/{{ title | slugify }}/index.html"
date: 2023-01-22
tags:
  # - post
  - drafts
  - finance
---

# Tech Equity: The hard way

> The advice I had seen online was "treat startup stock options like they're worthless and go from there". As I've learned the hard way, this is absolutely terrible advice.

Startup equity is one area I wish I had a better grasp of when I first received it. I went in, bright eyed, bushy tailed, with zero understanding what startup equity was. The advice I had seen online was "treat startup stock options like they're worthless and go from there". As I've learned the hard way, this is absolutely terrible advice. I ended up ignoring my equity and ended up in a situation where I was essentially "golden handcuffed" to my equity which limited mobility and was a major source of stress for me.

I was in an unfortunate place where I had nobody I could talk about equity with. No mentors, no family members, no friends, no community that had experience with equity. I was alone. I suspect I'm not the only one in that position. I've wanted to write this guide for a while now. It contains everything I've learned, the hard way, about equity compensation from the perspective of a tech employee in the United States.

I**'m not a lawyer, financial advisor, compensation expert, tax expert, or in any way connected to any financial institutions.** I'm a software engineer that joined a startup without properly educating himself about his equity. This is my best understanding of startup equity, learned over several years. Take my advice with a grain of salt. I'd encourage you to go out and seek additional resources. I'll list resources I've used, so you can have somewhere to start.

The information in this guide is only useful for those in the United States, and even then things can be different from State to State. Please talk to some experts or do more research to understand your equity. This guide is meant to give you an overview of startup equity, to give you some basic information and a lay of the land.

## Vesting

Vesting is a strategy for how the company wants to distribute the equity to you over a set period of time. There is typically a _vesting period_ and a _cliff_. You'll hear equity referred to as having a "4 year vest with a 1-year cliff". To break this down:

- A cliff is usually some set amount of time in which you won't be given any equity (1 year cliff), after which after you hit 1 year, you'll be given 1/4 of your shares. This is to ensure you're at the company at least 1 year before receiving equity.
- After the cliff, the full amount of equity will be given to you on a regular basis (usually monthly or quarterly) over the rest of the period. If you vest monthly, then each month you'll receive 1/36th of your remaining shares.

The timeline looks like this for a typical 4-year vesting period with a 1-year cliff:

| Months  | Equity |
| ------- | ------ |
| 0 - 11  | 0%     |
| 12      | 25%    |
| 12 - 48 | 2.08%  |

The standard is a 4-year vesting period with a 1-year cliff, but vesting periods and cliffs can come in any shape or form.

## Equity types

First off, when you join a startup, there are two different types of equity you could receive. Incentive Stock Offers (ISOs) or Restricted Stock Units (RSUs). Each type have their distinctions which I will cover. Generally, early stage startups offers ISOs while later stage startups and public companies offer RSUs.

An important piece of equity, and what drives how they are structured, is the tax implications on you. Understanding the tax implications of your equity is incredibly important because it could mean you could pay taxes on shares you can't sell, or you could save a large amount of money in taxes if you structure things in a certain way.

### Incentive Stock Offers (ISOs)

ISOs are simply stock options with some special tax benefits. [Incentive Stock Options (ISO): Definition and Meaning](https://www.investopedia.com/terms/i/iso.asp):

> An incentive stock option (ISO) is a corporate benefit that gives an employee the right to buy shares of company stock at a discounted price with the added benefit of possible tax breaks on the profit. The profit on qualified ISOs is usually taxed at the capital gains rate, not the higher rate for ordinary income. Non-qualified stock options (NSOs) are taxed as ordinary income.

The important thing to understand about ISOs and stock options is that they are just contracts that give you the **right** but _not_ the obligation to purchase shares in your company at a specified price. ISOs are not actual shares of the company. You still need to purchase the shares which is referred to as _exercising your options_.

When you exercise your options, you purchase shares from the company at the _Strike Price_ which is the price denoted in your contract. This means you need to write a check to your company for the cost of the shares, and they give you the shares. There are also tax implications to exercising stock options which will be covered below.

The idea with ISOs is that you have an _option_ to purchase shares at a certain price, usually the company's valuation when you're granted the shares. Then as the company becomes more valuable, you can choose to buy the shares at that locked in lower price. If the company goes bankrupt, you don't lose anything because you didn't have to lay out cash for your shares. You also don't get taxed on your stock options until certain events happen (covered below), so you can avoid paying taxes until there is an exit event so you can sell shares to cover the taxes.

Some companies offer the ability to _early exercise_ all your shares. This means you can exercise _all_ your shares, including the unvested shares. There are distinct tax benefits that I'll cover below, and this should be something to consider when joining a company.

### Restricted Stock Units (RSUs)

Restricted Stock Units, are actual units of stock that you're given once certain conditions are met. This is usually something later stage startups and public companies offer. During my tenure at Noom, we transitioned from ISOs to RSUs so I hold both instruments. RSUs are usually much simpler. You hit certain conditions, then you're given the shares.

The tax implications of RSUs are also much easier to understand.

Its important to understand the conditions in which RSUs become your property. You'll hear terms like "single trigger" or "double trigger" RSUs. A trigger is a condition that needs to be met in order for you to have full ownership over a stock unit (hence restricted). This article from [carta](https://carta.com/blog/single-trigger-rsu/) is a good explanation of RSU triggers.

In a nutshell:

- Single Trigger - Once a share vests, you own it.
- Double Trigger - Once a share vests **and** the company has an exit event, you own it.

The main reason for double trigger RSUs is to not burden employees with taxes on shares when they vest.

> RSUs are taxed as supplemental income to the employee at the time they vest.
> [carta](https://carta.com/blog/single-trigger-rsu/

By having a 2nd trigger, you only pay taxes on your shares when the company has an exit event and you're able to sell your shares to cover the cost of the taxes.

## Valuing your equity

For public companies, figuring out the value of your equity is simple, just look at the stock price.

For private companies however, it is quite difficult. There is a massive information asymmetry between an individual and a company. The company deeply understands its value, future value, and ability to grow.

The bare minimum you need to know is:

1. How many shares there are in your stock grant
2. How much they're worth

Figuring out what a share is worth for a private company is difficult and will most likely require you to make a gut call. You do however have several tools at your disposal:

### Venture Raises

If the company has raised venture money, some basic information is usually available such as how much they raised and at what valuation. The valuation, along with knowing the number of shares outstanding, will give you an idea of what the VCs in that last round valued the company at per share.

For example:

Widget Inc has 1,000,000 shares outstanding and raised a $150,000 Series A at a $1,000,000 valuation.
You can glean from this information that:

- The VCs in that last round have valued this company at $1 per share
- The actual value for your shares are probably worth under $1 since investors usually get a preferred class of stock worth more.

The other tool at your disposal is the 409A Valuation:

### 409A Valuation

Private companies are required by law to have an independent entity value their company and provide the company with a Fair Market Value (FMV). Companies are also required to update this 409A valuation periodically or when there are certain events that happen.

See [What is a 409A valuation](https://carta.com/blog/what-is-a-409a-valuation/) for more information.

The 409A will give you a number, whether you believe it or not is for you to decide.

### Putting together a feeling

At the end of the day, since the company is private there is no way for you to get an accurate value for what people will pay for your equity. And of course this value will change in the future, hopefully positively, as the company becomes more valuable. Your job then is to decide:

1. Does the current valuation make sense?
2. Do you think the company has a growth trajectory so your equity will be worth more in the future?
3. Do you think there will be an exit event in the future so you can see some liquidity?

To drive home this analysis, let's take Widget Inc in the example above.

- Widget Inc's share price from the last raise was $1
- Widget Inc has provided the FMV from the last 409A valuation which was $1.10
- You're bullish on Widget Inc
  - You think their product is compelling and something you think lots of people will pay for
  - You think the world is changing and their product is well situated for the future
  - You've heard their pitch, and think that the company has a compelling vision for the future and solid plans to grow
  - You like the team, they've had experience seeing several startups to successful exits before
  - The company has shared that they think the shares could be worth $10 in the future.

Given these items:

1. You think the current valuation makes sense and actually might be a little low.
2. You think the company has a clear growth trajectory and you'll certainly see a bump in your equity price. Furthermore, you're not sure if you believe the company's valuation of $10 per share, but the total compensation you'd receive from your base + bonus already exceeds your current compensation. You think it's worth taking the risk.
3. Furthermore, you think there could be an exit event in the future. You're not sure about the 5-year timeframe, but the economy is good, and the company is growing, so there is a possibility. Either way, you're in no rush to IPO.

This scenario is made up, but hopefully it can convey some ideas on what to look for when determining how _you_ value the company.

## Tax implications

Second to determining the value of your equity is understanding the tax implications of your equity. You need to understand how tax works with your equity upfront because you might need to plan in advance. It's important to grasp the basic concepts!

### ISO holding periods

ISOs have a

### NSOs

### AMT

## Selling or financing your equity

## Leaving the company

## Scenarios

# Resources

- https://www.investopedia.com/terms/i/iso.asp
- https://every.to/p/what-should-you-do-with-your-options-during-a-downturn
- https://carta.com/blog/what-is-a-409a-valuation/
