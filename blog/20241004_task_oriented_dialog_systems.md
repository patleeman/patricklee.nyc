---
layout: blog-post.liquid
title: Task Oriented Dialog Systems 
description:
date: 2024-10-04
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
---

# Introduction

During my time at Clockwise, [I worked on Prism](https://www.linkedin.com/pulse/building-prism-how-we-developed-our-domain-specific-patrick-lerhaupt-uinvc/), a calendar management product that leverages AI to interpret user commands to execute actions on their calendar. I won't go too deep into my work at Clockwise, but I will explore the concept of using domain-specific languages with LLMs to achieve a goal.

I stumbled across this concept when I found [Grammar Prompting for Domain-Specific Language
Generation with Large Language Models](https://arxiv.org/pdf/2305.19234). During the last year, I haven't seen much discourse on domain-specific languages in conjunction with large language models, and I've been trying to wrap my head around why. I'm not an expert in machine learning or natural language processing (NLP), so I have incomplete knowledge. 

This post is a collection of insights I've gathered over the past year. If you're well-versed in Task-Oriented Dialog (TOD) systems, I'd love to connect and learn more from you!

# Task-oriented dialog systems

From what I've gathered, the approach we used is a subset of NLP known as Task-Oriented Dialog (TOD) Systems.

## What is a Task-Oriented Dialog (TOD) System?

From my understanding, a TOD:

- Is a *conversational system* that helps users **do** something (achieve a goal).
- Interprets the user's intent through baked-in assumptions or through workflows to disambiguate requests.
- Manages the conversation state and has logic to complete workflows (to achieve a goal).

In a nutshell, it's a system that interprets a user's intent (their utterance), resolves ambiguity, and then formulates a plan for execution.

> Fun Fact: In NLP, they use the term utterance to refer to a single unit of human speech or text. It's the basic unit of communication in NLP systems.

## What's an example?

Take, for example, an assistant like [Amazon's Alexa](https://www.amazon.science/blog/new-alexa-research-on-task-oriented-dialogue-systems) or Apple's Siri. A user may provide the following utterance:

**User:** Siri, what's the weather today?

**Assistant:** The weather today in New York is 74 degrees Fahrenheit. 

How does the system go from the user asking what the weather is to it responding with the weather? This Task-Oriented Dialog system requires several major components:

1. Figure out what the user is trying to achieve: "The user would like to know the weather"
2. Remove ambiguity, such as the user's location: "The user would like to know the weather in their location"
3. Create a plan to execute: "Get the weather in their location and return that to the user"

Even breaking down this system into smaller pieces results in quite a bit of complexity!
1. The system needs a way to turn the user's request into a plan (a program).
2. The system needs a way to figure out the user's location.
3. The system needs a way to output this result to the user.

In order to get a machine to interpret the user's intent, the intent must be translated into a machine-readable plan. This is where a representation of complex ideas comes into play (a domain-specific language maybe?):

For example, what if our plan was a Python program?

```python
def get_user_location():
  '''Gets the user location from previously stored user information or via device gps'''

def get_weather(location):
  '''Query an external weather API to get the weather in the user's location'''

def program():
  return get_weather(get_user_location())
```

That's a lot of different systems for a relatively "simple" request!

## Why aren't they more popular?

This is a question I've asked myself time and time again over the last year. The approach is fairly solid, and with large language models, NLP is so much easier than it used to be. So why isn't it more popular?

### Anatomy of a basic TOD system

First, let's look at what we need for a basic TOD system:

1. We need a way to turn a user's utterance into some kind of structured data that we can then interpret.
2. We need a way to train some model to output this structured data.
3. We need to then take the output plan and "run" it on our systems to execute actions to achieve a goal.

How this looks in the system we built at Clockwise was:

1. We generated user utterances and domain-specific language conversations synthetically using a larger model.
2. We fine-tuned an open-source model using this data.
3. We built an interpreter that would "run" this DSL and execute actions to achieve the user's goal and connected it to existing internal APIs.

It was a **ton** of work! It took me and a team of backend engineers a year to get a stable working system!

### Downsides of TOD systems

So why aren't TOD systems more popular in this age of a massive influx of AI companies? In my opinion:

1. They just don't know about it.

Many people, myself included, enter the space with little to no prior knowledge or experience in NLP systems. We became interested with the popularization of LLMs and wanted to build things with this new LLM technology.

2. TODs are complex and hard to build!

It takes a lot of work to build a TOD system. Just the basic system I outlined required:

- Creating a domain-specific language
- Creating an interpreter for this custom domain-specific language
- Generating a dataset to teach a model how to output this domain-specific language
- Making sure this dataset was clean and didn't have issues like hallucinated keywords, or syntax errors
- Doing the actual model training and tweaking hyperparameters
- Serving the model on some kind of GPU-enabled infrastructure
- Creating an eval dataset and setting up a way to test model output to control quality

It's a lot of complex components and takes a long time even if you have a team of highly experienced engineers. 

3. It takes a lot of work to create custom datasets to train a model on your domain-specific language.

If you create a custom DSL, any trained model will have no context on that language since it doesn't appear in its training data. That means that you need to provide documentation and examples for how to use the DSL, and in turn, that means you need to have a deep understanding of the different use cases and appropriate actions the model can take.


### Upsides of a TOD system

1. Control

With a TOD system, it is much easier to control the LLM output, constraining it to whatever is do-able by your domain-specific language. You can also keep your business logic out of the prompt for the model. Essentially your "plans" or programs in your DSL is your business logic and it can be expressed in some intermediate representation.

2. Auditability

With some intermediate representation of the user's intent, you can easily audit this plan or present it to the user for confirmation prior to executing the actions. This is very important to ensure the user experience is both reproducible and controllable. You don't want an LLM making decisions in some black box that you can't debug or explain to the user why it did what it did. You certainly don't want to let an LLM make potentially damaging changes to users' data without their explicit confirmation!

3. LLMs are not AGI

I think it's important to re-iterate that LLMs are not general intelligence. Leaving the ability for an LLM to make decisions is akin to letting users roll a weighted die on how to achieve their goal. It may work most of the time, but it can also blow up in their faces. 

### So why aren't they more popular?

Ultimately, I think they're just hard to build. Large companies have the resources to invest into NLP experts and teams of developers to build out complicated systems and main them. Smaller companies that want to "implement AI" are just trying to find low hanging fruit and build their entire workflows around LLMs. 

There is also a fatigue around "chat bots" happening now. Lots of chat focused applications are thin wrappers over LLMs and they've shown their functionality to be quite limited. There has been a push to integrate LLMs in other ways into products like copilots or agents.

If you have a different theory, I would **love** to hear it though!

## Alternative: Function Calling / Tool Use

For those of us coming into the NLP and TOD space from the outside, we encounter [function calling](https://platform.openai.com/docs/guides/function-calling) or tool use. Function calling is a popular feature implemented in many large LLM services that allow LLMs to "use tools" or reach out to external APIs or to call code.

These are good tools if you're using an LLM as a conversational partner and to enable the LLM to achieve more, but for a TOD system, function calling requires embedding all your business logic into LLM prompts. Ultimately, this means less controllability of a highly non-deterministic system, and ultimately decision-making is left to the LLM. Letting an LLM control your business logic is **not good**! You want full control and accountability of your system!

## Just use Python

Why create your own language when you can use an existing language like Python? The model already knows how to write Python. 

Yes, that's true. We looked into this and you run into two main problems. 

First, you need to figure out how to sandbox Python and be sure there are no leaks anywhere; otherwise, you create a major security hole. 
Second, you run into the issue of the model trying to use its vast knowledge of Python to do all sorts of stuff. 

When we experimented with Python output, the model tended to try to import packages, both from the core library and third party. This opens up another vector for attack.

Finally, Python is fairly verbose, and the more verbose your language, the more tokens it takes to generate an output, the slower your overall system will be.

## Isn't fine-tuning dead?

Why are you fine-tuning models? Didn't you know that [fine-tuning is dead?](https://christianjmills.com/posts/mastering-llms-course-notes/conference-talk-009/)

Well, I'm sorry to tell you that the reports of fine-tuning's demise are greatly exaggerated. RAG and in-context learning are powerful, yes, but you're still paying per token for model input! 

You're also beholden to high latencies with external services! You can fine-tune an 8B model for a specific purpose with much lower per-token latencies than using a larger general model.

# Conclusion

So this is what I understand of the current state of the world from my very limited point of view as a web developer trying to figure out how to incorporate LLMs into an existing product. 

I would love to learn more about Task Oriented Dialog systems and get a better sense of the environment in which they exist. Please reach out! I'd love to hear from you if you've worked on systems like this before.


# Other Resources

- [Task-Oriented Dialogue as Dataflow Synthesis](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00333/96470/Task-Oriented-Dialogue-as-Dataflow-Synthesis)
- [Grammar Prompting for Domain-Specific Language Generation with Large Language Models](https://arxiv.org/abs/2305.19234)
- [Natural Language Commanding via Program Synthesis](https://arxiv.org/abs/2306.03460)
- [Dataflow Dialogue Generation](https://arxiv.org/abs/2308.02323)
- [AnyTOD](https://arxiv.org/abs/2212.09939)
- [google-research/task-oriented-dialogue](https://github.com/google-research/task-oriented-dialogue?tab=readme-ov-file)
- [budzianowski/multiwoz](https://github.com/budzianowski/multiwoz)
- [Princeton COS598C](https://www.cs.princeton.edu/courses/archive/spring20/cos598C/) [Lecture Notes on TOD](https://www.cs.princeton.edu/courses/archive/spring20/cos598C/lectures/lec16-task-oriented-dialogue.pdf)
- [Making Something out of Nothing: Building Robust Task-oriented Dialogue Systems from Scratch](https://www.amazon.science/alexa-prize/proceedings/making-something-out-of-nothing-building-robust-task-oriented-dialogue-systems-from-scratch)