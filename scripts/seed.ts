import { PrismaClient, ContentType, ContentStatus, ComplianceLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  CRISPR_2016_THESIS,
  COAL_2016_THESIS,
  INDIA_2016_THESIS,
  RAISING_CAPITAL_2017_THESIS,
  PPJV_2017_THESIS,
  FAMILY_OFFICES_2018_THESIS,
  AI_2019_THESIS,
} from './archive-theses'

const prisma = new PrismaClient()

const DISCLOSURE =
  'The content on this website is provided for general informational and educational purposes only and reflects personal opinions and observations. Nothing here constitutes investment advice, a recommendation, an offer, or a solicitation to buy or sell any security or to pursue any investment strategy. Historical commentary describes thinking at the time it was written and is not a prediction of future results. Investing involves risk, including the possible loss of principal.'

const FORTHCOMING = '__FORTHCOMING__'

const ANTHROPIC_30T_BODY = `## TL;DR

- Anthropic's **>$30 trillion TAM** is best understood as AI-addressable economic activity, not forecast revenue. It is roughly one-quarter of current global GDP.
- A **$2 trillion valuation** equals about **31x** the current $65 billion annualized run rate, but only **10x** Anthropic's $200 billion 2028 forecast. My math implies the $200 billion case requires about **4.84% monthly growth** from July 2026 — roughly 76% annualized — a dramatic deceleration from the recent pace.
- **Price-to-sales alone is incomplete.** Compute intensity and an estimated gross margin around **44%** make the direction of gross margins and inference economics central to valuation.
- If frontier-model capabilities converge, Anthropic's potential moat may be **governable, trusted enterprise intelligence**: safety, interpretability, auditability, security controls and institutional reputation rather than model intelligence alone.
- AI's economic rent will be **split** across enterprises, applications and agents, frontier models, semiconductors, hyperscalers and governance. The agent layer could resemble the **dBASE/Lotus/Borland era** — enormous innovation followed by consolidation — while physical AI opens the next frontier.

Reuters reported this week that Anthropic is expected to tell investors that its total addressable market exceeds $30 trillion, an estimate based not simply on the market for software but on the scope of work that could potentially be performed using AI models. (Reuters, Aug. 25, 2026).

There are numbers so large that they almost become meaningless, and $30 trillion is certainly one of them. For perspective, the IMF's April 2026 World Economic Outlook database puts the global economy at roughly $126 trillion in nominal terms. Anthropic is effectively describing an addressable market approaching one-quarter of annual world economic output. (IMF World Economic Outlook, Apr. 2026).

At first glance, that sounds like the sort of TAM calculation technology companies sometimes use to justify extraordinary valuations. But I think there is a more interesting question here. If artificial intelligence is simply another category of enterprise software, then a $30 trillion TAM is difficult to defend. If increasingly capable AI systems can perform portions of what we have historically called human cognitive labor, however, software spending may no longer be the right denominator.

Anthropic is not forecasting $30 trillion in revenue. Its actual 2028 revenue projection is reportedly approximately $190 billion to $200 billion. The $30 trillion number is better understood as an estimate of economic activity that AI could potentially touch. (Reuters, Aug. 15, 2026).

That distinction is fundamental, because it shifts the investment question from "How much software can Anthropic sell?" to something much larger: How much economic value can computational intelligence create, and how much of that value can Anthropic actually capture?

## Is Anthropic Really That Expensive?

Anthropic was valued at approximately $965 billion in May 2026 after raising $65 billion. At that time, the company said its revenue run rate had surpassed $47 billion. By the end of July, its annualized revenue run rate had reportedly increased to more than $65 billion, compared with approximately $9 billion at year-end 2025. (Reuters, May 28, 2026; Reuters, Aug. 17, 2026).

Using the July run rate gives us a simple reference point:

> $965 billion ÷ $65 billion = **14.8x sales**

There has also been considerable discussion about a possible IPO valuation approaching $2 trillion. At that valuation:

> $2 trillion ÷ $65 billion = **30.8x sales**

Thirty-one times sales sounds extraordinarily expensive until we look at what investors are already willing to pay for certain companies with unusually high growth rates. Reuters reported that bankers evaluating Anthropic have considered companies including Palantir, Cloudflare and SpaceX as valuation references. At the time of that analysis, Palantir traded at approximately 53 times expected 2026 revenue, while Cloudflare and SpaceX were both around 41.6 times expected 2026 revenue. (Reuters, Aug. 15, 2026).

These are not perfect comparisons. Anthropic's $65 billion figure is an annualized run rate rather than trailing twelve-month revenue, and its cost structure may ultimately look very different from conventional SaaS. Nevertheless, I think the comparison is useful because it separates the emotional reaction to a $1 trillion or $2 trillion valuation from the actual multiple investors are paying.

The absolute valuation may be extraordinary. The revenue multiple is not unprecedented. The more important issue is how quickly that revenue denominator is changing.

## The $200 Billion Forecast May Be Less Aggressive Than It Looks

Normally, we might compare a company's earnings multiple with its growth rate using something like a PEG ratio. Anthropic does not yet give us the mature earnings profile necessary to make that especially useful, but the underlying principle still applies: a revenue multiple means something very different for a company growing 15% than it does for one growing 75% or 100%.

Anthropic's reported revenue run rate increased from approximately $9 billion at year-end 2025 to more than $65 billion by the end of July 2026. Reuters Breakingviews noted that the reported figures imply approximately 58% month-over-month growth in April, another 57% into May, followed by a slower 38% increase over the next two months combined. (Reuters Breakingviews, Aug. 18, 2026).

Going from $9 billion to $65 billion in roughly seven months is more than a sevenfold increase. Mathematically, that is approximately 32.6% compounded monthly growth. Obviously, that rate cannot continue. If we extrapolated it mechanically, Anthropic's revenues would eventually exceed the size of the global economy. That is not a criticism of the growth; it simply demonstrates how quickly exponential growth becomes mathematically absurd when projected too far into the future.

I think the more useful exercise is to reverse the question. How much does Anthropic's growth have to slow in order to reach only $200 billion of revenue in 2028?

Starting from a $65 billion July 2026 annualized run rate, I calculate that monthly revenue would need to grow at approximately 4.84% per month for Anthropic to generate approximately $200 billion during calendar 2028. That is still approximately 76% annualized growth, but it represents a massive deceleration from what the company has recently experienced.

- **4.0% monthly (~60% annualized):** ~$165B FY2028 revenue; ~$203B exit-2028 run rate
- **4.84% monthly (~76% annualized):** ~$200B FY2028 revenue; ~$256B exit-2028 run rate
- **5.0% monthly (~80% annualized):** ~$207B FY2028 revenue; ~$268B exit-2028 run rate
- **7.0% monthly (~125% annualized):** ~$328B FY2028 revenue; ~$462B exit-2028 run rate
- **9.0% monthly (~181% annualized):** ~$515B FY2028 revenue; ~$791B exit-2028 run rate

These are my calculations, not Anthropic forecasts.

Reuters Breakingviews made a similar observation looking only through year-end 2026: even if Anthropic's monthly growth slowed to approximately 9%, the company could still reach a revenue run rate above $100 billion by December. (Reuters Breakingviews, Aug. 18, 2026).

The valuation implications are important. If Anthropic produces $200 billion of revenue in 2028, a $965 billion valuation would equal approximately 4.8 times 2028 sales, while a $2 trillion valuation would equal 10 times sales.

If revenue instead reached $328 billion, corresponding to the 7% monthly-growth scenario above, a $2 trillion valuation would equal only about 6.1 times sales. At $515 billion of revenue, it would be below 4 times sales. I am not predicting either outcome. I think the point for investors is different. The relevant question is not simply whether 31 times today's run-rate revenue is expensive. It is how much growth must occur before today's apparently extraordinary valuation becomes ordinary, and what probability should we assign to that growth?

That is a much more useful way to think about Anthropic.

## Revenue Isn't Profit

There is an important counterargument, however, and I think it may ultimately be more important than the revenue multiple. Anthropic is not Salesforce.

Traditional SaaS companies have historically produced attractive economics because, after the software is developed, the marginal cost of supplying another customer can become very small. AI does not yet work that way. Every inference consumes compute. Training frontier models is enormously expensive, and increasingly autonomous agents can use substantially more computing resources as they work through longer and more complex tasks.

Reuters Breakingviews cited a PitchBook estimate putting Anthropic's gross margin at approximately 44%, reflecting the enormous infrastructure costs involved in serving AI models. (Reuters Breakingviews, Aug. 18, 2026).

Those requirements continue to grow. Reuters reported that Anthropic has agreed to spend $45 billion over six years renting computing capacity from Nscale's West Virginia data center campus, in addition to other substantial infrastructure commitments. (Reuters, Aug. 26, 2026).

For investors, this may eventually matter more than the TAM. I would want to know whether the cost of producing a unit of intelligence is declining faster than the price customers are paying for it. If inference costs fall rapidly while customers continue paying for increasingly valuable outcomes, Anthropic's gross margins could improve materially. If model pricing falls just as quickly — or faster — then Anthropic could produce enormous revenue without ever developing the economics traditionally associated with great software businesses.

So while P/S is useful today, gross-margin progression may ultimately tell us much more about what Anthropic is actually worth.

## What Does a $30 Trillion AI Economy Really Mean?

This brings us back to Anthropic's TAM. Reuters' reporting indicates that the $30 trillion estimate incorporates the value of work that could potentially be conducted using AI models. That is a very different denominator from software spending. (Reuters, Aug. 25, 2026).

I have increasingly come to think about artificial intelligence in the context of a broader Computational Economy. The history of technology is, to a meaningful degree, the history of overcoming human limitations. Machines amplified our physical strength. Computers dramatically increased our ability to calculate. Networks expanded our ability to communicate. The internet reduced the cost of distributing information. Artificial intelligence extends computation into a different domain: cognition.

McKinsey has estimated that generative AI could create $6.1 trillion to $7.9 trillion of annual economic benefits when broader labor-productivity effects are included. That estimate is still far below Anthropic's $30 trillion TAM, but it demonstrates how quickly the numbers become large once we stop measuring software subscriptions and begin measuring the economic value of work. (McKinsey Global Institute, 2023).

Consider the practical implications. A lawyer who can review ten contracts instead of two has increased output without adding five times as many lawyers. A programmer who completes the same project in half the time has increased productivity. A financial analyst who can screen hundreds of companies instead of dozens has dramatically expanded the amount of information that can be processed. A physician who walks into an examination room with years of medical history already synthesized is able to deploy his or her time differently.

Initially, AI improves the workflow. Increasingly, it begins to perform parts of the workflow. We move from software used by labor toward software that performs portions of labor. I believe that distinction is much more important than simply thinking of AI as the next software category.

It also explains why Anthropic can plausibly describe a $30 trillion addressable universe while forecasting only $200 billion of revenue. Its 2028 revenue estimate would represent less than 0.7% of the stated TAM. Anthropic does not need to capture very much of the economic activity being transformed. But neither should investors assume that Anthropic — or any AI provider — will collect anything close to the total value that AI creates.

## If Intelligence Becomes a Commodity, Where Is the Moat?

This is where I think the Anthropic investment thesis becomes more complicated. Every important technology market eventually raises the same question: where is the sustainable competitive advantage?

Anthropic competes with OpenAI, Google's Gemini, Meta, Mistral, DeepSeek and a rapidly expanding field of proprietary and open-weight model developers. The capital and data required to train frontier systems create substantial barriers to entry, but model performance also appears capable of converging surprisingly quickly. One model pulls ahead, another catches up, open models improve, inference costs decline, and pricing comes under pressure.

If the underlying intelligence becomes increasingly interchangeable, simply having a very capable model may not be enough. For an investor, I think the question becomes: Why would an enterprise continue paying Anthropic if another model becomes equally capable and significantly cheaper?

One possible answer is trust. But I do not mean trust as marketing. I mean something much more practical: the ability to provide governable intelligence that enterprises are willing to entrust with increasingly consequential functions.

## We Don't Fully Understand What We Have Built

This may be one of the strangest aspects of the AI revolution. Conventional computer programs are explicitly engineered. A programmer writes instructions and the computer executes them. A large neural network is trained rather than explicitly programmed. During that process, it develops internal representations and strategies across billions of mathematical operations that researchers can measure but frequently cannot explain.

Anthropic's own interpretability researchers are surprisingly direct about this. They write that models learn their own strategies during training and that "we don't understand how models do most of the things they do." (Anthropic, Mar. 27, 2025).

Anthropic has made the distinction elsewhere that researchers understand the mathematics of a neural network but often do not understand why those mathematical operations produce particular behaviors. (Anthropic, Oct. 5, 2023).

This is not simply Anthropic talking about its own technology. A 2025 paper in Nature Machine Intelligence similarly described modern neural networks as largely opaque and argued that this opacity limits verifiability and trust. (Nature Machine Intelligence, 2025).

I had previously heard estimates suggesting that researchers understand as little as 3% of what occurs inside frontier neural networks. I have not been able to find a sufficiently credible academic basis for that number, so I would not use it. We do not need it. The reality is remarkable enough: we understand the mathematics used to construct these systems while still having limited ability to explain many of the internal mechanisms that produce their behavior.

For investors, this matters because the consequences of that uncertainty change dramatically as AI systems gain agency.

## The Risk Changes When AI Can Act

If an AI summarizes an article incorrectly, the consequences are normally limited. If an autonomous system modifies a production database, moves money, approves credit, changes software, executes a contract, communicates with customers, accesses protected information or controls physical equipment, the problem is very different. The AI is not simply producing an inaccurate answer. It is taking an action.

McKinsey's 2026 AI Trust Maturity Survey found that nearly two-thirds of respondents identified security and risk concerns as the largest obstacle to fully scaling agentic AI. Seventy-four percent considered inaccuracy a highly relevant risk, while 72% cited cybersecurity. (McKinsey, Mar. 25, 2026).

The insurance industry is already beginning to deal with the same issue. Reuters reported in August 2026 that cyber insurers were reconsidering how policies should treat losses involving autonomous agents because traditional distinctions between authorized and unauthorized actions become difficult when an AI operates autonomously using permissions legitimately granted by its owner. (Reuters, Aug. 27, 2026).

I can imagine a Fortune 500 company experiencing a catastrophic loss not because its systems were hacked, but because an AI agent operated exactly within the permissions it had been given while doing something management never intended. That is a very different risk. And I think it makes trust economically important.

## Can Trust Become an Anthropic Moat?

Only if Anthropic can turn trust into something measurable. Anyone can say they are the responsible AI company. That alone is not a moat. The competitive advantage has to be delivered through engineering, governance, transparency, enterprise controls and ultimately a track record.

Anthropic appears to be investing heavily in each of those areas. Its publicly available Claude Constitution describes the values and behaviors it wants Claude to exhibit and is incorporated into the model's training process. (Anthropic, Jan. 22, 2026).

Its Responsible Scaling Policy establishes progressively stronger safeguards as model capabilities increase. The company has also built a substantial interpretability research organization dedicated specifically to understanding internal model behavior. (Anthropic, Responsible Scaling Policy).

On the enterprise side, Anthropic reports that its commercial products have achieved ISO 27001, ISO 42001, SOC 2 Type I and Type II certifications, with configurations available for certain HIPAA-regulated applications. (Anthropic Privacy Center, 2026).

Anthropic has also achieved substantial enterprise penetration. The company reported in February that eight of the Fortune 10 were Claude customers, while the number of customers spending more than $1 million annually had increased to more than 500. (Anthropic, Feb. 12, 2026).

Menlo Ventures estimated that Anthropic captured approximately 40% of enterprise foundation-model spending in 2025, compared with 27% for OpenAI and 21% for Google. Menlo is an Anthropic investor, so I would treat the exact percentages as directional, but they are still noteworthy. Menlo also estimated that Anthropic had approximately 54% of enterprise LLM spending associated with coding. (Menlo Ventures, 2025).

I do not think trust alone explains that success. Claude's performance in coding and enterprise workflows is clearly important. But I do think trust can become increasingly significant as enterprises delegate more authority to AI. The potential moat is therefore broader than safety. It may ultimately consist of capability, reliability, security, governance, interpretability, workflow integration, switching costs and institutional reputation.

The last element is particularly interesting to me because reputation takes time to build. Google can release a better model tomorrow. OpenAI can cut prices. An open-weight model can outperform Claude on a benchmark. But nobody can instantly create years of evidence that enterprises can safely entrust important workflows to a system. If trust matters, time itself may strengthen the moat.

## DeepSeek and the Difference Between Capability and Trust

DeepSeek illustrates the other side of this issue. There is a factual basis for enterprise concern, although I think it is important to describe it precisely rather than politically.

Chinese regulations governing public-facing generative AI services explicitly require providers to uphold prescribed "socialist core values" and restrict certain categories of content considered contrary to state interests or social stability. Those rules extend into areas including algorithm design, training-data selection and model optimization. (State Council / CAC, Interim Measures, 2023).

Reuters subsequently reported that U.S. government testing found models including DeepSeek R1 considerably more likely than U.S. models to reproduce Beijing's official positions when answering questions involving politically sensitive subjects. (Reuters, July 9, 2025).

This does not mean Western models are value-neutral. They are not. Anthropic literally publishes a Constitution describing the values it wants Claude to exhibit. OpenAI and Google make their own alignment decisions. So I do not think the useful distinction is whether a model contains values. They all do.

The better questions for an enterprise are: Who determines those values? How transparent are they? Can they be audited? Can they be modified? Under whose legal framework are they governed? And are they compatible with the enterprise's own regulatory and fiduciary obligations? A model whose alignment is affected by political and legal requirements imposed by another sovereign jurisdiction may face substantial barriers in sensitive Western enterprise deployments.

But I would not dismiss DeepSeek as a competitor. In some ways, I think DeepSeek may represent a more important competitive threat than its direct commercial revenues suggest. Its current V4 family is available with open weights, which means models can be hosted elsewhere, modified and integrated into environments outside the vendor's own hosted service. (DeepSeek, V4 Preview, Apr. 24, 2026).

DeepSeek therefore does not need to win a large bank's hosted enterprise account to affect Anthropic. It simply needs to demonstrate that very capable intelligence can become materially cheaper. That makes DeepSeek a commoditization competitor. And if raw intelligence becomes commoditized, Anthropic has to give customers a reason to pay a premium. That brings us back to trust.

## Where Does the Economic Value Actually Go?

There is another analytical problem with the $30 trillion TAM. We cannot simply divide $30 trillion among Nvidia, Amazon, Anthropic and AI application companies. Revenue gets counted multiple times as it moves through the technology stack.

An agent might charge a customer $100. The agent company might spend $25 with Anthropic. Anthropic might effectively spend $12 on cloud infrastructure, and the cloud provider may have $6 of semiconductor expense embedded in supplying that compute. There is not $143 of newly created economic value. There is $100 moving through several layers.

So I think the better investment question is not who records the largest amount of revenue, but who ultimately captures the economic rent. If AI eventually creates 100 units of incremental economic value, an illustrative long-term distribution might look something like this:

- **Enterprises and consumers through productivity gains:** 45%
- **Applications, agents and workflow owners:** 20%
- **Frontier model providers:** 12%
- **Semiconductors and specialized compute:** 10%
- **Hyperscalers, data centers and infrastructure:** 8%
- **Security, governance, data and orchestration:** 5%

Illustrative framework only; not a forecast.

These percentages are not forecasts. They are simply a framework for thinking about where the economics might settle. And I think the first line may ultimately be the most important. The biggest beneficiary of AI may not be the AI industry.

Suppose a bank spends $100 million annually on AI and produces $500 million of additional output or cost savings. The AI ecosystem has captured $100 million of revenue, but the bank has captured $400 million of economic value. If competition forces the bank to pass some of those savings through to customers, the value migrates again. This is typical of transformative technologies. The social and economic value they create can be much larger than the revenues of the companies producing the underlying technology.

McKinsey's economic work is consistent with this distinction: much of generative AI's potential value comes through labor productivity and improved output across existing industries rather than revenue flowing directly to AI vendors. (McKinsey Global Institute, 2023).

For investors, that distinction is critical. AI-addressable economic activity is not the same thing as AI-industry revenue.

## Semiconductors May Have a Stronger Moat Than I Initially Thought

One area where I have modified my own thinking is semiconductors. The semiconductor market is fiercely competitive, but competition and commoditization are not the same thing. Nvidia is demonstrating that rather dramatically.

Nvidia continues to experience enormous demand for AI computing and recently forecast roughly 70% revenue growth for its next fiscal year, even as major customers invest heavily in custom silicon. (Reuters, Aug. 26, 2026).

The moat is not simply the GPU. It includes CUDA, networking, libraries, developer familiarity, systems architecture, scale, supply-chain expertise and an extraordinarily rapid product-development cadence. Longer term, custom silicon from hyperscalers and model providers is likely to put pressure on those economics. But today I would argue that the semiconductor layer may possess one of the strongest competitive moats in the AI ecosystem. That is a useful reminder that investors should not confuse the presence of competition with the absence of pricing power.

## Hyperscalers: Revenue Is Not the Same as Return on Capital

Amazon, Google and Microsoft are also in an unusually strong position. They own infrastructure, distribution, customer relationships and increasingly parts of the semiconductor stack. But they also have to finance enormous amounts of capital investment.

AI data centers can generate huge revenues while simultaneously requiring huge amounts of invested capital. So I think investors have to distinguish between revenue capture and economic-profit capture. The layer generating the most dollars of revenue does not necessarily produce the best return on capital. That distinction becomes increasingly important as hundreds of billions of dollars flow into AI infrastructure.

## Frontier Models and the Commoditization Question

Anthropic, OpenAI and Google may eventually become some of the largest companies in the world. But I think they also face the most interesting commoditization question.

What happens if highly capable intelligence becomes plentiful? Model performance converges. Token pricing continues to decline. Open models improve. Inference becomes dramatically more efficient. If those trends continue, the frontier model starts looking increasingly like an input rather than a differentiated product.

That does not mean Anthropic fails. It means Anthropic needs to create differentiation above raw intelligence. I think the investment question changes if model capabilities continue to converge. Intelligence itself may become progressively less differentiated. In that case, Anthropic's ability to establish Claude as a system that large enterprises are willing to trust with increasingly important workflows could become a significant competitive advantage. Whether that advantage is durable — and whether customers will actually pay a premium for it — is something investors should watch closely.

## The Agent Layer: I've Seen This Movie Before

This may be the AI layer with both the greatest entrepreneurial opportunity and the greatest mortality rate.

When I was first getting into computers, some of the important names in software were Ashton-Tate, Lotus and Borland. For those of us using computers at the time, Ashton-Tate was not some obscure software company. dBASE III was a major product. Lotus 1-2-3 seemed almost synonymous with the spreadsheet. Borland became an important force in programming and database tools. And before Lotus, VisiCalc had essentially created the spreadsheet category.

These were important companies with important products. Their brands mattered. Their competitive advantages appeared to matter. Today, many younger people working in technology have never heard of them.

What is interesting is that the functionality did not disappear. In many cases, the functionality became ubiquitous while the companies that originally commercialized it disappeared, were acquired or were displaced by larger integrated platforms. Microsoft eventually combined word processing, spreadsheets, databases, presentation software and communications into an integrated productivity environment that became much more powerful than the individual applications it displaced.

I think something similar may happen with AI agents. Today, there appears to be an agent for everything: legal research, sales, financial analysis, software development, customer support, marketing, medical documentation, insurance underwriting, procurement, recruiting and travel.

Menlo Ventures estimates that enterprises spent approximately $19 billion on generative-AI applications during 2025, compared with approximately $12.5 billion directly on foundation-model APIs. (Menlo Ventures, 2025).

So the application layer is already economically meaningful. But I suspect it may also become one of the fastest-changing competitive environments we have ever seen. Many businesses being financed today as independent AI companies may eventually turn out to be features. Claude adds the functionality. ChatGPT adds it. Gemini adds it. Salesforce adds it. Microsoft adds it. And the independent company suddenly has a problem.

This is where I think the dBASE III experience is instructive. The fact that a capability becomes indispensable does not mean the company that initially commercialized that capability becomes indispensable.

For investors in the agentic layer, I think the underwriting question therefore has to go beyond whether the product works. What does the company own that a frontier-model provider or incumbent software platform cannot easily reproduce? The most defensible agents may control proprietary data, workflows, domain expertise, regulatory permissions, customer relationships, institutional knowledge, systems integrations or significant switching costs.

A generic legal agent may be easy to replace. A legal AI platform that has become deeply integrated into a firm's precedent library, document repository, billing system, matter-management system, security architecture and institutional knowledge is a very different proposition. That is a moat. The application layer may ultimately capture substantial economic rent, but I would expect an extraordinary Darwinian period before we know which companies actually deserve it.

## Governance May Become an Industry of Its Own

There may also be another layer developing around AI that investors should not ignore: security, identity, agent permissions, auditability, model monitoring, data governance, observability, human approval systems and insurance. These may sound like supporting functions, but as AI becomes more autonomous, they become much more important.

McKinsey estimates that the portion of enterprise cybersecurity budgets devoted specifically to technologies governing AI agents could approach 15% by 2029. (McKinsey, May 19, 2026).

I think the analogy to financial markets is useful. A bank is not valuable simply because it can move money. The financial system works because we have built an enormous architecture around the movement of money: custody, auditing, identity, regulation, permissions, capital requirements, risk management and insurance.

We may be building something similar around artificial intelligence. As enterprises give AI greater authority, they will need systems that determine what the AI may access, what it may do, when a human must intervene, who is responsible for its actions, and how those actions can be stopped or reversed. An entire trust infrastructure may emerge around artificial intelligence. If that happens, Anthropic's early emphasis on safety, interpretability and governance may eventually look less like philosophical positioning and more like a commercial strategy.

## And Then AI Leaves the Computer

So far, most of this discussion has concerned cognitive work. But there is another transition beyond it. Computers initially expanded numerical computation. AI expanded computation into cognition. Agents are beginning to translate cognition into autonomous digital action. The next step is autonomous physical action. That is physical AI.

Robotics takes intelligence out of the computer and places it into factories, warehouses, hospitals, farms, construction sites, logistics systems, mines and eventually homes.

McKinsey estimates that robotics and physical AI could generate at least $1 trillion of economic value by 2040, initially concentrated particularly in manufacturing and logistics. (McKinsey, June 24, 2026).

The technology remains immature compared with some of the hype. Reuters recently reported that even China's rapidly advancing humanoid-robotics industry continues to struggle with dexterity, adaptability and the ability to economically perform many everyday physical tasks. (Reuters, Aug. 27, 2026).

That should not surprise us. Walking across a room, reaching into a drawer and picking up an unfamiliar object involve extraordinary perception, balance, dexterity and instantaneous adaptation. We do not think of them as difficult because humans learn to do them when they are very young.

But if the intelligence and control problems are eventually solved, robotics opens another enormous category of economically addressable labor. I would therefore separate physical AI from Anthropic's current $30 trillion TAM rather than use robotics to justify that number. Physical AI represents another potential frontier beyond the cognitive economy Anthropic is principally addressing today.

## What Should Investors Watch?

1. **Revenue deceleration.** Anthropic's recent growth rate is obviously unsustainable. The important question is where growth stabilizes. If the company can still grow 60% to 80% annually several years from now, today's valuation mathematics look very different.

2. **Gross-margin progression.** I would pay particular attention to whether inference efficiency and lower compute costs translate into higher margins or are simply passed through to customers through lower prices.

3. **Model pricing and commoditization.** If competing models continue converging in capability while token prices fall, Anthropic will need differentiation beyond raw model performance.

4. **Enterprise retention and switching costs.** How deeply is Claude embedded into workflows? Does usage broaden from coding and knowledge work into operational systems? Are customers willing to standardize around Anthropic?

5. **Trust and governance.** Can Anthropic demonstrate lower operational risk, better controls, greater auditability and more predictable behavior than competing models? More importantly, are customers willing to pay for that difference?

6. **Where the economic rent moves.** Does value remain with model providers, move down to semiconductors and infrastructure, migrate upward to agents and applications, or stay primarily with the enterprises using AI to become more productive?

Those questions are, in my view, more useful than simply debating the headline valuation.

## So What Is Anthropic Actually Worth?

A $2 trillion valuation against a $65 billion revenue run rate gives us a number: 31 times sales. It does not give us an investment conclusion.

If Anthropic reaches $200 billion of revenue in 2028, that same valuation becomes 10 times sales. If growth materially exceeds the company's forecast, today's valuation could ultimately look surprisingly modest. If growth slows much more quickly, it could look extraordinarily expensive.

But revenue is only one variable. We also need to understand what happens to gross margins, compute costs, model pricing, enterprise retention, switching costs, open-model competition, the economics of the agent layer and the degree to which trust becomes a genuine source of pricing power.

The $30 trillion TAM makes for a great headline, but I do not think it is the most important number. The more important question is: If artificial intelligence becomes capable of performing trillions of dollars of human work, what portion of that value will accrue to the company supplying the intelligence, and what prevents that intelligence from becoming a commodity?

Anthropic's potential answer increasingly appears to be enterprise adoption combined with trust. There is already evidence that enterprises are using Claude at substantial scale. But the durability of that position will depend on whether Anthropic can transform trust from corporate positioning into something measurable, operational and difficult to reproduce.

If model capabilities continue to converge, I think the investment question changes. Intelligence itself may become progressively less differentiated. In that case, Anthropic's ability to establish Claude as a model that large enterprises are willing to trust with increasingly important workflows could become a significant competitive advantage. Whether that advantage is durable — and whether customers will pay a premium for it — is something investors should watch closely.

Paradoxically, this matters precisely because we still have limited understanding of how these models generate many of their behaviors. As artificial intelligence becomes more capable, enterprises may increasingly ask not simply which model is smartest, but which model they are willing to trust. And that may ultimately tell us more about Anthropic's value than the $30 trillion TAM.`

const ANTHROPIC_30T_DISCLOSURE = `This article is provided for general informational and educational purposes only and reflects my personal views, analysis and observations. Nothing contained herein constitutes investment, financial, legal or tax advice, a recommendation regarding any security or investment strategy, or an offer or solicitation to buy or sell any security or investment product.

Any forward-looking statements, estimates, total-addressable-market assumptions, valuation comparisons, financial projections or other expectations discussed herein are inherently uncertain and should not be relied upon as predictions of future results. Information concerning private companies may be derived from reported financing transactions, secondary-market indications, company statements or third-party sources and may not reflect audited financial information or actual realizable values.

The views expressed are my own and do not necessarily reflect the views or opinions of Covenant Venture Capital, LLC, Covenant Investment Management, LLC, or any other company, organization or entity with which I am affiliated.

Investing involves risk, including the possible loss of principal.`


const BIOTECH_2015_THESIS = `There have been 51 healthcare IPO's this year, nearly triple the amount of IPO's of the next most active sector, technology. This is partially symptomatic of the market environment, as the NASDAQ Biotechnology Index has nearly doubled since 2012, attracting many new investors to the sector. However, the run up is leading to many questions, not the least of which is sustainability. Is this a classic bubble, characterized by issuers taking advantage of frothy multiples? Or is it a function of much more fundamental and profound changes in the sector? And how is the risk matrix in the sector changing? For new investors interested in biotech exposure, here are some basic things to consider:

We believe the growth is a function of fundamental changes in the way research is being conducted. In terms of drug discovery, three major factors have contributed to unprecedented advances. And all three are available because of historically cheap and dramatically increased computer processing power. These technologies have played a key role combined with genome sequencing to significantly increase the rate of medical biotechnology innovation.

**HTS or High Throughput Screening** is a concept that has been around for decades. It basically involves testing a vast number of synthetic or biological compounds for ability to modulate a biological target using a quantitative assay. Researchers have adopted HTS as a standard protocol as they sift through a daunting number of compounds looking for the next "blockbuster drug". The difference between HTS of thirty years ago and HTS of today is the level of technological innovation that has reduced the testing cycle time for a single compound from over one year to as little as four days. HTS is one fundamental change that has contributed to the increased number of potential drugs being identified, correlating directly to biotech capital markets activity.

**Bioinformatics** is a second major factor contributing to acceleration of drug discovery. Imagine data mining of large networked databases that contain everything from genome sequences to detailed pharmacological properties of virtually every known compound. Bioinformatics software allows researchers to access vast amounts of information about molecules curated from published and unpublished bench research to understand the characteristics of specific compounds for potential modulation of a biological target. For example, bioinformatics gives researchers access to pharmacokinetic data to "model" potential interactions with targets and to predict potential toxicity.

**Genome sequencing** is the third major innovation, through increased efficiency. Genome sequencing is the foundation that has enabled researchers to make tremendous strides in understanding advanced biomolecular functions. The net effect of these three capabilities is increased efficiency in the research process resulting in a fundamental increase in drug discovery and therefore, capital markets activity.

Many early stage R&D companies are taking advantage of momentum in the public markets and completing microcap financing rounds through reverse merger transactions, SB1 and EGA IPO filings. We anticipate that Reg A+ will become a popular public financing pathway as the structure gains acceptance with buy-side investors and the SEC approval cycle is better understood.

With fundamental industry changes accelerating the rate of discovery, and more and more biotech companies popping up in the microcap markets, how can microcap investors take advantage of these trends? First and foremost, address the basic fundamentals.

## Five Basic Questions to Ask

### 1. What's the burn rate?

That's the infamous question always asked by VC's, but for most early stage biotech companies that means cash on the balance sheet available to keep the company running to the next milestone. This should be a key critical risk indicator when considering any biotech investment. For issuers and investors alike, the primary risk in biotech is cash. With the full FDA clinical trials cycle often exceeding $800 million dollars, it's one of the first due diligence items an investor should consider. Major biopharma companies such as Merck, Pfizer, Novartis and Sanofi, typically carry several billion of cash on their balance sheets. Pfizer for example carried roughly $35B as of 12/31/2014 and for the same period Merck, Novartis and Sanofi carried $15B, $14B and $11B of cash, cash equivalents and short term investments respectively. And to put the tremendous R&D cost in even better perspective, keep in mind that they maintain those cash balances even though they are all already profitable.

Some of the more exciting recent IPOs such as JUNO and KITE carry significant cash and maintain a market cap and trading profile that ensures continued access to capital. Although these companies are R&D companies, they are not microcap companies by any means. As of 12/31/2014 for example, Juno had roughly $355M of cash on the balance sheet. And Kite had roughly $368M of cash and short term investments as of 12/31/2014. In addition to liquid trading profiles, in many cases these companies have effective shelf registrations and powerful alliances such as the recently announced Juno – Celgene alliance.

By contrast microcap biotech companies, defined as those with market caps less than $300M, maintain substantially less cash. As a result when analyzing potential targets, future dilution should be considered a major risk.

### 2. Who are the institutional investors sponsoring the deal?

Dilution can be mitigated if a target has strategic agreements in place with larger biopharma companies. Additionally, several early stage biopharma R&D companies have gone public with significant equity investors such as VC's on board. In many cases, these equity partners can serve as sources for R&D capital infusions at competitive multiples when the funds are needed. Where this can be considered a risk mitigant, it makes sense to take a close look at financing documents, investment intent etc. to understand the investors longer term commitment to subsequent rounds. Rights of first refusal in term sheets are possible indicators of future intent. Of course it's stating the obvious that if the companies fail to achieve their goals, it's safe to assume the money will not be there regardless of original intent.

### 3. Are partnerships in place or being considered?

Strategic joint ventures and licensing are additional risk mitigants that can address low balance sheet capital for microcaps. We like strategic partnerships and joint venture partnerships a lot! Not only do they provide microcaps with a way to potentially finance the regulatory process, they provide management access to significant knowledge capital in terms of best practices in areas that many small companies lack experience in, such as manufacturing and commercialization.

### 4. What are the costs of Phase 2 & Phase 3, and how will that be financed?

Many biopharma companies are purchasing their pipeline in lieu of in-house research. And licensing deals are being cut earlier in the R&D cycle. If management are intending to out-license IP to a major during phase 2 or earlier, evidence of those discussions can verify likelihood of this type of deal. Licensing is becoming more and more popular, and in 2012, roughly 25% of licensing took place during phase 2. Understanding licensing terms will also provide an understanding of financial viability, and provide a basis to understand forward valuation.

Understanding the regulatory pathway is critical. Not all pathways are the same. For example, testing drugs for cardiac therapeutics are notoriously complex and expensive. Does management have a comprehensive plan post phase 1? What are projected costs for Phase 2, 2b and Phase 3? And what are management's plans for financing those activities?

### 5. What is the competitive landscape for the specific therapeutic focus?

Understanding the science is also a key due diligence point. Molecular biology is becoming increasingly complex, and there is an information asymmetry between biotech and finance that significantly impedes ability to effectively price risk. Hence we recommend that investors contract expert networks to do the scientific analysis. The broader the network's expertise, the more likely there is the ability to provide specific insight and comprehensive understanding of investment risk. A "PhD" doesn't necessarily qualify as an expert unless the PhD is in the specific therapeutic focal area. There are several expert networks that can provide the necessary insight.

## Where to look

With a clear knowledge of cash on hand, sponsorships and partnerships, financing milestones, regulatory pathway and the underlying science, the risk matrix starts to become much clearer. There are approximately 163 sub $300M microcap biotech companies listed in the US, almost half of which have market caps under $100M. And there are many private biotech startups, some of which will inevitably take the microcap pathway to obtain capital for R&D. Compared with the multi-billion dollar plus market caps of Juno, Kite and other, the microcap subsector of the biotech market clearly has its allure for some as they search for therapeutic analogs.

Armed with some basic fundamentals, here are a few areas to further stack the odds in your favor. Orphan drugs, repurposed drugs, and biologics represent areas where investors can potentially find value. Repurposed drugs offer developers the benefit of significant clinical data from prior studies to shorten the regulatory approval cycle for a particular therapeutic application. Orphan drugs that are designed to treat rare disorders are also an interesting area. The Orphan Drug Act, ODA has provided many incentives for biotech developers. And the clinical trials are less costly than non-orphan drugs due to trial sizes.

Biologics, defined as anything derived from or synthesized from biological sources, are also making major headway. Several CAR-T developers have reported significant efficacy for certain type a leukemia such as ALL. CAR's are chimeric antigen receptors. This type of exciting breakthrough therapy reprograms a patients own immune system to attack specific types of cancer cells that were not recognized prior to reprogramming. Larger companies such as JUNO, KITE and Novartis are all working on areas such as CAR-T. And there are a number of microcap and small private companies working on similar therapeutic approaches. TCR's or T Cell Receptors, Mab's or monoclonal antibodies and certain stem cells based therapeutics are also biologics that hold significant potential.

## Editor's note

Karl Douglas is an investor and director at Unify Biotechnologies LLC, a biotech investment company. This article was co-authored with Andre Ragnauth, PhD — Director, Unify Biotechnologies, LLC; Director, Bio-Behavior Laboratory and Behavioral Core Facility, Sophie Davis Medical School at the City College of New York.

This article is not making any specific recommendation of any kind, and is not an offer to sell securities or investment advisory services.`

// Compliance-safe summary shown in place of the withheld 2022 article body.
// No performance figures, return comparisons, Covenant-specific return
// statements, investment guidance, or specific securities appear here.
const PRIVATE_MARKETS_2022_SUMMARY = `## Thesis summary

This 2022 article drew together several threads that had run through the earlier writing on this site — the economy-wide arrival of artificial intelligence, the acceleration of biotechnology and gene editing, and, above all, the observation that an increasing share of value creation in emerging technology companies was taking place in the private markets, before those companies ever reached a public listing.

The piece argued that recognizing a structural technology transition is only half of the problem. The harder half is *access*: the companies positioned to benefit from these transitions are increasingly financed privately, and access to the strongest venture opportunities is constrained and heavily intermediated. That reality pointed toward the need for a disciplined, repeatable approach to private-market selection — one grounded in institutional validation and the decomposition of risk rather than in narrative alone. In the vocabulary used elsewhere on this site, these ideas later cohered into the Three Trigger Methodology.

## Historical context

The article was written as these observations converged into the investment approach pursued at Covenant. Because the original document contains historical performance figures, return comparisons, and related material that require compliance review before publication, the full article is not reproduced here. What appears above is a compliance-safe summary of its central argument and the role it played in the evolution of the underlying thinking.`

async function main() {
  // ---------------------------------------------------------------------------
  // Admin account (hidden test/admin account)
  // ---------------------------------------------------------------------------
  const adminEmail = 'abacus-4fdae5ad@example.com'
  const adminPassword = 'Z398gcg5p#'
  const hashed = await bcrypt.hash(adminPassword, 10)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashed, name: 'Site Administrator', role: 'admin' },
    create: { email: adminEmail, password: hashed, name: 'Site Administrator', role: 'admin' },
  })

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------
  const categories: { name: string; slug: string; description: string }[] = [
    { name: 'Investment Philosophy', slug: 'investment-philosophy', description: 'How I approach investing, risk, and consequential change.' },
    { name: 'Computational Economy', slug: 'computational-economy', description: 'Computation as a broad economic input across cognition, biology, and infrastructure.' },
    { name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'AI, compute, and the transition toward a computational economy.' },
    { name: 'Biotechnology', slug: 'biotechnology', description: 'Drug discovery, bioinformatics, and computational convergence in the life sciences.' },
    { name: 'Commodities', slug: 'commodities', description: 'Secular commodity demand, industrialization, and structural forces.' },
    { name: 'Private Markets', slug: 'private-markets', description: 'Secondary markets, access, and institutionally validated private opportunities.' },
    { name: 'Venture Capital', slug: 'venture-capital', description: 'Elite venture participation and early-stage capital formation.' },
    { name: 'Market Risk', slug: 'market-risk', description: 'Balance-sheet risk, leverage, liquidity, and nonlinear repricing.' },
    { name: 'Financial Technology', slug: 'financial-technology', description: 'The evolution of financial computing and market infrastructure.' },
    { name: 'Enterprise Software', slug: 'enterprise-software', description: 'Software value creation and disruption.' },
    { name: 'Capital Allocation', slug: 'capital-allocation', description: 'Deciding when structural change becomes investable.' },
  ]
  const catMap: Record<string, string> = {}
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: c,
    })
    catMap[c.slug] = row.id
  }

  // ---------------------------------------------------------------------------
  // Tags
  // ---------------------------------------------------------------------------
  const tagNames = [
    'Pattern Recognition', 'Evidence Over Prediction', 'Convergence', 'Institutional Validation',
    'Three Trigger Methodology', 'Super Tanker Trades', 'Computational Economy', 'Artificial Intelligence',
    'Private Markets', 'Venture Capital', 'Secondaries', 'Biotechnology', 'Technology Investing',
    'Commodities', 'Market Risk', 'Capital Allocation', 'Structural Change',
    'AI Infrastructure', 'Robotics', 'Energy', 'Enterprise Software', 'Market Structure', 'Capital Formation',
  ]
  const tagMap: Record<string, string> = {}
  for (const name of tagNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const row = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    })
    tagMap[name] = row.id
  }

  // ---------------------------------------------------------------------------
  // Helper
  // ---------------------------------------------------------------------------
  type EntrySeed = {
    type: ContentType
    status?: ContentStatus
    title: string
    subtitle?: string
    slug: string
    summary?: string
    body?: string
    bodyPlaceholder?: boolean
    publicationDate?: Date | null
    originalPublicationDate?: Date | null
    categorySlug?: string
    tags?: string[]
    readingTime?: number
    videoEmbedUrl?: string | null
    transcript?: string | null
    externalSourceLink?: string | null
    externalSourceName?: string | null
    disclosureText?: string | null
    complianceLevel?: ComplianceLevel
    seoTitle?: string
    metaDescription?: string
    sortOrder?: number
    featured?: boolean
    originalSource?: string
    originalThesis?: string
    processContribution?: string
    retrospectiveWhatSaw?: string
    retrospectiveWhyMattered?: string
    retrospectiveWhatHappened?: string
    retrospectiveContext?: string
    retrospectiveWhatRight?: string
    retrospectiveUnderestimated?: string
    retrospectiveLearned?: string
  }

  async function upsertEntry(e: EntrySeed) {
    const data = {
      type: e.type,
      status: e.status ?? ContentStatus.PUBLISHED,
      title: e.title,
      subtitle: e.subtitle ?? null,
      summary: e.summary ?? null,
      body: e.body ?? null,
      bodyPlaceholder: e.bodyPlaceholder ?? false,
      author: 'Karl B. Douglas',
      publicationDate: e.publicationDate ?? null,
      originalPublicationDate: e.originalPublicationDate ?? null,
      categoryId: e.categorySlug ? catMap[e.categorySlug] ?? null : null,
      readingTime: e.readingTime ?? null,
      videoEmbedUrl: e.videoEmbedUrl ?? null,
      transcript: e.transcript ?? null,
      externalSourceLink: e.externalSourceLink ?? null,
      externalSourceName: e.externalSourceName ?? null,
      disclosureText: e.disclosureText ?? null,
      complianceLevel: e.complianceLevel ?? ComplianceLevel.GREEN,
      seoTitle: e.seoTitle ?? null,
      metaDescription: e.metaDescription ?? e.summary ?? null,
      sortOrder: e.sortOrder ?? 0,
      featured: e.featured ?? false,
      originalSource: e.originalSource ?? null,
      originalThesis: e.originalThesis ?? null,
      processContribution: e.processContribution ?? null,
      retrospectiveWhatSaw: e.retrospectiveWhatSaw ?? null,
      retrospectiveWhyMattered: e.retrospectiveWhyMattered ?? null,
      retrospectiveWhatHappened: e.retrospectiveWhatHappened ?? null,
      retrospectiveContext: e.retrospectiveContext ?? null,
      retrospectiveWhatRight: e.retrospectiveWhatRight ?? null,
      retrospectiveUnderestimated: e.retrospectiveUnderestimated ?? null,
      retrospectiveLearned: e.retrospectiveLearned ?? null,
      tags: e.tags && e.tags.length ? { connect: e.tags.map((t) => ({ id: tagMap[t] })).filter((x) => x.id) } : undefined,
    }
    await prisma.contentEntry.upsert({
      where: { slug: e.slug },
      update: data,
      create: { slug: e.slug, ...data },
    })
  }

  // ---------------------------------------------------------------------------
  // FRAMEWORKS (descriptive content from the spec)
  // ---------------------------------------------------------------------------
  await upsertEntry({
    type: ContentType.FRAMEWORK,
    title: 'Pattern Recognition',
    subtitle: 'Seeing structural change before it becomes consensus',
    slug: 'pattern-recognition',
    summary: 'Pattern recognition as a discipline: repeated exposure to technological and market transitions, identifying relationships across fields, and distinguishing genuine signal from storytelling after the fact.',
    categorySlug: 'investment-philosophy',
    tags: ['Pattern Recognition', 'Structural Change'],
    sortOrder: 1,
    featured: false,
    complianceLevel: ComplianceLevel.GREEN,
    disclosureText: DISCLOSURE,
    body: [
      '## Pattern recognition as a discipline',
      'Pattern recognition, in the way I use the term, is a discipline rather than an instinct. It is built through repeated, direct exposure to technological and market transitions, and refined by studying how large systems actually change over time.',
      '## Relationships across disciplines',
      'The most useful patterns rarely sit inside a single field. They appear where technology, capital markets, and economics intersect. Identifying relationships across disciplines is what allows a change in one system to be read as a signal about another.',
      '## Pattern recognition versus storytelling after the fact',
      'There is an important difference between recognizing a pattern as it forms and constructing a narrative that explains it afterward. Hindsight narratives feel persuasive precisely because the outcome is already known. Discipline means testing whether a pattern was observable in advance.',
      '## Why multiple independent signals matter',
      'A single indicator can mislead. Conviction should build only when multiple independent signals point in the same direction. Convergence across unrelated sources is far more meaningful than any one data point on its own.',
    ].join('\n\n'),
  })

  await upsertEntry({
    type: ContentType.FRAMEWORK,
    title: 'Super Tanker Trades',
    subtitle: 'Recognizing large structural forces whose direction has become difficult to reverse',
    slug: 'super-tanker-trades',
    summary: 'Some of the best opportunities arise not from predicting an uncertain event, but from recognizing a sufficiently large structural force whose direction has become increasingly difficult to reverse.',
    categorySlug: 'commodities',
    tags: ['Super Tanker Trades', 'Commodities', 'Structural Change'],
    sortOrder: 2,
    featured: false,
    complianceLevel: ComplianceLevel.GREEN,
    disclosureText: DISCLOSURE,
    body: [
      '## The metaphor',
      'A VLCC—a supertanker—cannot change direction quickly. Once enough evidence demonstrates that it has turned, the eventual direction becomes easier to anticipate.',
      '> Some of the best opportunities arise not from predicting an uncertain event, but from recognizing a sufficiently large structural force whose direction has become increasingly difficult to reverse.',
      '## Historical case study: China\'s industrialization',
      'China\'s rapid industrial expansion and its structural demand for raw materials is a defining example of a super tanker trade—a secular force large enough that, once its direction was visible, it was difficult to reverse quickly.',
      '## What shapes a super tanker thesis',
      'A durable structural thesis depends on how these forces interact:',
      '- Secular versus cyclical change\n- Demand persistence\n- Capital intensity\n- Supply response\n- Leverage\n- Timing\n- What can invalidate the thesis',
      '## What can invalidate it',
      'A super tanker thesis is not permanent. Recognizing what would falsify it—an unexpected supply response, a structural shift in demand, or a change in the underlying economics—is as important as recognizing the trend itself.',
    ].join('\n\n'),
  })

  await upsertEntry({
    type: ContentType.FRAMEWORK,
    title: 'The Three Trigger Methodology',
    subtitle: 'Evidence over prediction',
    slug: 'three-trigger-methodology',
    summary: 'A risk-reduction and opportunity-screening framework for identifying private-market opportunities using observable institutional validation rather than pure forecasting.',
    categorySlug: 'private-markets',
    tags: ['Three Trigger Methodology', 'Evidence Over Prediction', 'Institutional Validation', 'Private Markets'],
    sortOrder: 3,
    featured: true,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    body: [
      '## Evidence over prediction',
      'The Three Trigger Methodology is a way of identifying opportunities using observable institutional validation rather than pure forecasting. It is a risk-reduction and opportunity-screening framework—not a guarantee of investment success.',
      '## What the methodology emphasizes',
      '- Elite venture participation\n- Sequential institutional validation\n- Large institutional commitment rounds\n- External validation\n- Capital availability\n- Reduction of management, product, and financing risk',
      '## Remaining risks',
      'Even when triggers are present, meaningful risks remain. Institutional validation reduces certain categories of risk; it does not eliminate them. The framework is a screen for evidence, not a promise of outcomes.',
    ].join('\n\n'),
  })

  await upsertEntry({
    type: ContentType.FRAMEWORK,
    title: 'The Computational Economy',
    subtitle: 'Computation as a broad economic input',
    slug: 'computational-economy',
    summary: 'A thesis that computation is evolving from a tool used primarily for numerical processing into a broad economic input affecting cognition, biology, robotics, infrastructure, financial systems, and enterprise activity.',
    categorySlug: 'computational-economy',
    tags: ['Computational Economy', 'Artificial Intelligence', 'Technology Investing'],
    sortOrder: 4,
    featured: true,
    complianceLevel: ComplianceLevel.GREEN,
    disclosureText: DISCLOSURE,
    body: [
      '## Core thesis',
      'Computation is evolving from a tool used primarily for numerical processing into a broad economic input—one that affects cognition, biology, robotics, infrastructure, financial systems, and enterprise activity.',
      '## Organizing layers',
      'This is an evergreen area of study. It can be organized into layers, each of which is intended to expand into its own sub-pages and diagrams over time:',
      '- **Compute** — the underlying capacity that makes the rest possible.\n- **Energy** — the constraint and enabler of large-scale computation.\n- **Financial Infrastructure** — how capital and markets adapt.\n- **Physical Intelligence** — robotics and systems that act in the world.\n- **Biological Intelligence** — computation applied to life sciences.\n- **Advanced Computation** — the frontier of what computation can do.\n- **Enterprise Applications** — where these capabilities meet economic activity.',
    ].join('\n\n'),
  })

  // ---------------------------------------------------------------------------
  // THESIS ARCHIVE (2015 biotech entry) — full original article restored
  // ---------------------------------------------------------------------------
  await upsertEntry({
    type: ContentType.ARCHIVE,
    title: 'Biotech Investing: Five Basic Questions to Ask',
    subtitle: '2015',
    slug: '2015-biotech-investing',
    summary:
      'Written for MicroCap Review in 2015, this piece argued that biotech\u2019s acceleration reflected fundamental changes in how research was conducted\u2014high-throughput screening, bioinformatics, increasingly efficient genome sequencing, and dramatically cheaper computing\u2014and laid out five basic diligence questions for evaluating early-stage biotech investments.',
    categorySlug: 'biotechnology',
    tags: ['Biotechnology', 'Pattern Recognition', 'Convergence'],
    originalPublicationDate: new Date('2015-09-10'),
    featured: true,
    sortOrder: 10,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review (Summer/Fall 2015)',
    externalSourceName: 'LinkedIn',
    externalSourceLink:
      'https://www.linkedin.com/pulse/biotech-investing-five-basic-questions-ask-karl-b-douglas/',
    originalThesis: BIOTECH_2015_THESIS,
    processContribution:
      'Established the discipline of reading convergence \u2014 several enabling technologies compounding at once \u2014 as the signal that a field is structurally changing rather than simply cyclical.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  // ---------------------------------------------------------------------------
  // ARCHIVE — canonical historical articles (2016–2019)
  // Original text reproduced faithfully; retrospectives are draft placeholders.
  // ---------------------------------------------------------------------------
  await upsertEntry({
    type: ContentType.ARCHIVE,
    title:
      'CRISPR, Gene Editing Possibly the Biggest Biotech Advance since Mapping the Human Genome',
    subtitle: '2016',
    slug: '2016-crispr-gene-editing',
    summary:
      'A 2016 follow-on to the biotech thesis, arguing that CRISPR gene editing \u2014 layered on the earlier convergence of genome mapping, informatics and high-throughput screening \u2014 could reset the cost and speed of discovery across the entire field.',
    categorySlug: 'biotechnology',
    tags: ['Biotechnology', 'Pattern Recognition', 'Convergence'],
    originalPublicationDate: new Date('2016-01-01'),
    sortOrder: 20,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: CRISPR_2016_THESIS,
    processContribution:
      'Reinforced pattern recognition \u2014 watching a single enabling technology reset the cost and speed of discovery across an entire field.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title: 'Coal will be 3rd Most Popular Source of Energy in 2030',
    subtitle: '2016',
    slug: '2016-coal-survivorship',
    summary:
      'A contrarian 2016 look at a sector widely declared dead, arguing that balance-sheet strength and leverage \u2014 not the structural decline of coal itself \u2014 would determine which companies survived and where value remained.',
    categorySlug: 'commodities',
    tags: ['Commodities', 'Super Tanker Trades', 'Market Risk'],
    originalPublicationDate: new Date('2016-07-01'),
    sortOrder: 30,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: COAL_2016_THESIS,
    processContribution:
      'Focused attention on balance-sheet risk and leverage as the deciding variables when a structural, hard-to-reverse trend meets a distressed sector.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title: '2016 Microcaps Trends \u2013 The Indians are Coming!',
    subtitle: '2016',
    slug: '2016-india-us-capital-markets',
    summary:
      'A 2016 piece observing that India \u2014 among the world\u2019s fastest-growing economies \u2014 was strikingly underrepresented in US capital markets, and framing listing structure and market access as an investable opportunity.',
    categorySlug: 'private-markets',
    tags: ['Private Markets', 'Capital Allocation'],
    originalPublicationDate: new Date('2016-01-01'),
    sortOrder: 40,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: INDIA_2016_THESIS,
    processContribution:
      'Framed market access and listing structure as an investable edge, not just a backdrop.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title:
      'Raising Capital in the Microcap Market: 7 Success Factors for Achieving Significant Capital Raise Objectives',
    subtitle: '2017',
    slug: '2017-institutional-sponsorship',
    summary:
      'A 2017 practitioner\u2019s guide to raising capital in the microcap market, drawing out the role of institutional sponsorship and disciplined preparation \u2014 an early articulation of the idea that who backs a company is itself evidence.',
    categorySlug: 'private-markets',
    tags: ['Private Markets', 'Institutional Validation', 'Capital Allocation'],
    originalPublicationDate: new Date('2017-01-01'),
    sortOrder: 50,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: RAISING_CAPITAL_2017_THESIS,
    processContribution:
      'An early articulation of institutional sponsorship as evidence \u2014 a precursor to what later became the Three Trigger Methodology.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title: 'Will the Private Public Joint Venture "PPJV" Reinvent the PIPE Market?',
    subtitle: '2017',
    slug: '2017-private-public-joint-venture',
    summary:
      'A 2017 examination of financing structure, proposing the Private Public Joint Venture as an alternative to dilutive PIPE transactions \u2014 and treating capital structure itself as a driver of risk and outcomes.',
    categorySlug: 'market-risk',
    tags: ['Market Risk', 'Private Markets', 'Capital Allocation'],
    originalPublicationDate: new Date('2017-01-01'),
    sortOrder: 60,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: PPJV_2017_THESIS,
    processContribution:
      'Deepened attention to capital structure and financing design as a driver of risk and outcomes.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title: 'Family Offices: What You Need to Know',
    subtitle: '2018',
    slug: '2018-family-offices',
    summary:
      'A 2018 overview of family offices as the fastest-growing segment of the capital markets, and why understanding who controls capital \u2014 and how to reach them \u2014 is a distinct investment skill.',
    categorySlug: 'private-markets',
    tags: ['Private Markets', 'Capital Allocation'],
    originalPublicationDate: new Date('2018-01-01'),
    sortOrder: 70,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: FAMILY_OFFICES_2018_THESIS,
    processContribution:
      'Reinforced access \u2014 understanding who controls capital and how to reach them \u2014 as a distinct investment skill.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  await upsertEntry({
    type: ContentType.ARCHIVE,
    title:
      'Family Offices are Investing Heavily in Artificial Intelligence: Here are Five Reasons Why',
    subtitle: '2019',
    slug: '2019-artificial-intelligence-fourth-industrial-revolution',
    summary:
      'A 2019 article on family-office investment in artificial intelligence and the Fourth Industrial Revolution \u2014 an early framing of AI as an economy-wide platform transition rather than a single-sector bet.',
    categorySlug: 'artificial-intelligence',
    tags: ['Artificial Intelligence', 'Computational Economy', 'Structural Change'],
    originalPublicationDate: new Date('2019-01-01'),
    sortOrder: 80,
    complianceLevel: ComplianceLevel.YELLOW,
    disclosureText: DISCLOSURE,
    originalSource: 'MicroCap Review',
    originalThesis: AI_2019_THESIS,
    processContribution:
      'Marked the shift toward viewing AI and the Fourth Industrial Revolution as an economy-wide platform \u2014 the seed of the Computational Economy thesis.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  // ---------------------------------------------------------------------------
  // ARCHIVE — 2022 private-markets article (COMPLIANCE REVIEW PENDING).
  // Full document withheld from public reproduction until compliance review is
  // complete. Only a compliance-safe thesis summary + historical context are
  // shown. No performance figures, return comparisons, Covenant-specific
  // return statements, investment guidance, or specific securities are stored.
  // ---------------------------------------------------------------------------
  await upsertEntry({
    type: ContentType.ARCHIVE,
    title:
      'The Wealthy are Leaving the Public Markets in Favor of Private Markets. Here\u2019s Why.',
    subtitle: '2022',
    slug: '2022-private-markets-three-trigger',
    summary:
      'A 2022 article connecting several long-running threads \u2014 artificial intelligence, biotechnology and gene editing, and the migration of value creation into private markets \u2014 and the case for a disciplined, institutionally validated approach to accessing top-tier venture opportunities. The full document is under compliance review and is not reproduced publicly here.',
    categorySlug: 'private-markets',
    tags: ['Private Markets', 'Three Trigger Methodology', 'Institutional Validation'],
    originalPublicationDate: new Date('2022-01-01'),
    sortOrder: 90,
    featured: false,
    complianceLevel: ComplianceLevel.RED,
    disclosureText: DISCLOSURE,
    originalSource: FORTHCOMING,
    originalThesis: PRIVATE_MARKETS_2022_SUMMARY,
    processContribution:
      'Recognizing a structural technology transition was not enough. Accessing the companies benefiting from that transition required a repeatable institutional-validation and private-market selection framework.',
    retrospectiveWhatSaw: FORTHCOMING,
    retrospectiveWhyMattered: FORTHCOMING,
    retrospectiveWhatHappened: FORTHCOMING,
    retrospectiveContext: FORTHCOMING,
    retrospectiveWhatRight: FORTHCOMING,
    retrospectiveUnderestimated: FORTHCOMING,
    retrospectiveLearned: FORTHCOMING,
  })

  // ---------------------------------------------------------------------------
  // ESSAYS (Thinking) — placeholders per spec section 18
  // ---------------------------------------------------------------------------
  const essays: EntrySeed[] = [
    {
      type: ContentType.ESSAY,
      title: 'Anthropic and the $30 Trillion Question',
      subtitle: 'How Do You Value Intelligence?',
      slug: 'anthropic-30-trillion-question',
      summary:
        'Anthropic\'s >$30 trillion TAM is best understood as AI-addressable economic activity, not forecast revenue. A framework for valuing intelligence\u2014from run-rate multiples and gross margins to trust, commoditization, and the AI value chain.',
      body: ANTHROPIC_30T_BODY,
      categorySlug: 'artificial-intelligence',
      tags: ['Artificial Intelligence', 'Computational Economy', 'Technology Investing', 'Enterprise Software', 'Market Structure'],
      readingTime: 14,
      featured: true,
      sortOrder: 0,
      publicationDate: new Date('2026-08-27'),
      seoTitle: 'Anthropic and the $30 Trillion Question: How Do You Value Intelligence?',
      metaDescription:
        'Anthropic\'s >$30 trillion TAM isn\'t a revenue forecast\u2014it\'s AI-addressable economic activity. A framework for valuing intelligence: run-rate multiples, gross margins, trust, and the AI value chain.',
      disclosureText: ANTHROPIC_30T_DISCLOSURE,
      complianceLevel: ComplianceLevel.GREEN,
    },
    {
      type: ContentType.ESSAY,
      title: 'Recognizing Change Before It Becomes Consensus',
      slug: 'recognizing-change-before-consensus',
      summary: 'A foundational essay explaining pattern recognition, evidence, convergence, and how I approach major inflection points.',
      categorySlug: 'investment-philosophy',
      tags: ['Pattern Recognition', 'Convergence', 'Evidence Over Prediction'],
      featured: true,
      bodyPlaceholder: true,
      disclosureText: DISCLOSURE,
      sortOrder: 1,
    },
    {
      type: ContentType.ESSAY,
      title: 'Evidence Over Prediction: The Three Trigger Methodology',
      slug: 'evidence-over-prediction',
      summary: 'A framework for identifying private-market opportunities using observable institutional validation rather than pure forecasting.',
      categorySlug: 'private-markets',
      tags: ['Three Trigger Methodology', 'Evidence Over Prediction', 'Institutional Validation'],
      status: ContentStatus.DRAFT,
      featured: false,
      bodyPlaceholder: true,
      complianceLevel: ComplianceLevel.YELLOW,
      disclosureText: DISCLOSURE,
      sortOrder: 2,
    },
    {
      type: ContentType.ESSAY,
      title: 'The Computational Economy',
      slug: 'the-computational-economy',
      summary: 'A thesis about computation expanding beyond numerical processing into cognition, biology, robotics, and increasingly broad areas of economic activity.',
      categorySlug: 'computational-economy',
      tags: ['Computational Economy', 'Artificial Intelligence'],
      status: ContentStatus.DRAFT,
      featured: false,
      bodyPlaceholder: true,
      disclosureText: DISCLOSURE,
      sortOrder: 3,
    },
    {
      type: ContentType.ESSAY,
      title: 'Super Tanker Trades',
      slug: 'super-tanker-trades-essay',
      summary: 'How large secular forces\u2014whose direction becomes increasingly difficult to reverse once the turn is visible\u2014create durable investment opportunities.',
      categorySlug: 'commodities',
      tags: ['Super Tanker Trades', 'Commodities', 'Structural Change'],
      status: ContentStatus.DRAFT,
      bodyPlaceholder: true,
      disclosureText: DISCLOSURE,
      sortOrder: 4,
    },
    {
      type: ContentType.ESSAY,
      title: 'What I Saw in Biotechnology in 2015',
      slug: 'what-i-saw-in-biotechnology-2015',
      summary: 'Revisiting the convergence of high-throughput screening, bioinformatics, genome sequencing, and cheap compute that was reshaping drug discovery.',
      categorySlug: 'biotechnology',
      tags: ['Biotechnology', 'Convergence', 'Pattern Recognition'],
      status: ContentStatus.DRAFT,
      bodyPlaceholder: true,
      disclosureText: DISCLOSURE,
      sortOrder: 5,
    },
  ]
  for (const e of essays) await upsertEntry(e)

  // ---------------------------------------------------------------------------
  // VIDEOS (Watch) — placeholder cards for future content
  // ---------------------------------------------------------------------------
  const videos: EntrySeed[] = [
    {
      type: ContentType.VIDEO,
      title: 'The Computational Economy',
      slug: 'video-computational-economy',
      summary: 'A thoughtful discussion on computation as a broad economic input across cognition, biology, robotics, and infrastructure.',
      categorySlug: 'computational-economy',
      tags: ['Computational Economy', 'Artificial Intelligence'],
      bodyPlaceholder: true,
      videoEmbedUrl: null,
      transcript: null,
      disclosureText: DISCLOSURE,
      sortOrder: 1,
    },
    {
      type: ContentType.VIDEO,
      title: 'What Makes a Super Tanker Trade',
      slug: 'video-super-tanker-trades',
      summary: 'On recognizing large structural forces whose direction becomes difficult to reverse once the turn is visible.',
      categorySlug: 'commodities',
      tags: ['Super Tanker Trades', 'Structural Change'],
      bodyPlaceholder: true,
      videoEmbedUrl: null,
      disclosureText: DISCLOSURE,
      sortOrder: 2,
    },
    {
      type: ContentType.VIDEO,
      title: 'Evidence Over Prediction',
      slug: 'video-evidence-over-prediction',
      summary: 'How observable institutional validation can reduce risk and screen for opportunity in private markets.',
      categorySlug: 'private-markets',
      tags: ['Evidence Over Prediction', 'Three Trigger Methodology'],
      bodyPlaceholder: true,
      videoEmbedUrl: null,
      complianceLevel: ComplianceLevel.YELLOW,
      disclosureText: DISCLOSURE,
      sortOrder: 3,
    },
    {
      type: ContentType.VIDEO,
      title: 'What I Saw in Biotechnology in 2015',
      slug: 'video-biotechnology-2015',
      summary: 'Revisiting the computational convergence that was reshaping drug discovery a decade ago.',
      categorySlug: 'biotechnology',
      tags: ['Biotechnology', 'Convergence'],
      bodyPlaceholder: true,
      videoEmbedUrl: null,
      disclosureText: DISCLOSURE,
      sortOrder: 4,
    },
  ]
  for (const v of videos) await upsertEntry(v)

  // ---------------------------------------------------------------------------
  // RESEARCH (higher-frequency topical analysis, reviewed by Karl before
  // publication). Seeded as scoped, in-development placeholders: each entry
  // states the question it will examine and the framework it connects to, with
  // no fabricated findings or investment claims. Published as bodyPlaceholder so
  // the section renders its full information architecture honestly.
  // ---------------------------------------------------------------------------
  const research: EntrySeed[] = [
    {
      type: ContentType.RESEARCH,
      title: 'The Compute Buildout: AI Infrastructure as an Economic Constraint',
      slug: 'ai-infrastructure-compute-buildout',
      summary:
        'An examination of how the physical build-out of AI infrastructure—data centers, accelerators, and the energy that powers them—becomes a constraint and an enabler for the broader computational economy, and what observable evidence would signal that the shift is becoming investable.',
      seoTitle: 'AI Infrastructure and the Compute Buildout — Research',
      metaDescription:
        'How the physical build-out of AI infrastructure and energy shapes the computational economy, and the observable evidence that would make the shift investable.',
      categorySlug: 'computational-economy',
      tags: ['AI Infrastructure', 'Energy', 'Computational Economy'],
      bodyPlaceholder: true,
      featured: true,
      sortOrder: 1,
      complianceLevel: ComplianceLevel.GREEN,
      disclosureText: DISCLOSURE,
    },
    {
      type: ContentType.RESEARCH,
      title: 'Robotics and the Move Toward Physical Intelligence',
      slug: 'robotics-physical-intelligence',
      summary:
        'A look at how advances in robotics and embodied systems extend the computational economy from cognition into the physical world, and how the framework’s emphasis on convergence and evidence applies to a field still early in its adoption curve.',
      seoTitle: 'Robotics and Physical Intelligence — Research',
      metaDescription:
        'How robotics and embodied systems extend the computational economy into the physical world, viewed through the lens of convergence and observable evidence.',
      categorySlug: 'computational-economy',
      tags: ['Robotics', 'Computational Economy'],
      bodyPlaceholder: true,
      sortOrder: 2,
      complianceLevel: ComplianceLevel.GREEN,
      disclosureText: DISCLOSURE,
    },
    {
      type: ContentType.RESEARCH,
      title: 'Where Value Is Migrating in Private Markets',
      slug: 'private-markets-value-migration',
      summary:
        'An analysis of the continued migration of value creation into private companies and how the Three Trigger Methodology’s emphasis on institutional validation applies as more capital is formed and held privately for longer.',
      seoTitle: 'Value Migration in Private Markets — Research',
      metaDescription:
        'How the migration of value into private companies interacts with institutional validation and the Three Trigger Methodology.',
      categorySlug: 'private-markets',
      tags: ['Private Markets', 'Capital Formation'],
      bodyPlaceholder: true,
      featured: true,
      sortOrder: 3,
      complianceLevel: ComplianceLevel.YELLOW,
      disclosureText: DISCLOSURE,
    },
    {
      type: ContentType.RESEARCH,
      title: 'Biotechnology After the Computational Turn',
      slug: 'biotechnology-after-computational-turn',
      summary:
        'A revisiting of the 2015 biotechnology thesis in light of newer computational tools, connecting current developments in drug discovery back to the convergence argument at the center of the Computational Economy framework.',
      seoTitle: 'Biotechnology After the Computational Turn — Research',
      metaDescription:
        'Revisiting the biotechnology thesis as computational tools advance, connected to the Computational Economy framework.',
      categorySlug: 'biotechnology',
      tags: ['Biotechnology', 'Computational Economy'],
      bodyPlaceholder: true,
      sortOrder: 4,
      complianceLevel: ComplianceLevel.GREEN,
      disclosureText: DISCLOSURE,
    },
    {
      type: ContentType.RESEARCH,
      title: 'Market Structure and the Path to Liquidity in Private Assets',
      slug: 'market-structure-path-to-liquidity',
      summary:
        'An examination of how evolving market structure—secondaries, continuation vehicles, and new venues—changes the path to liquidity for private assets, and what that means for accessing institutionally validated opportunities.',
      seoTitle: 'Market Structure and Liquidity in Private Assets — Research',
      metaDescription:
        'How evolving market structure changes the path to liquidity for private assets and access to institutionally validated opportunities.',
      categorySlug: 'private-markets',
      tags: ['Market Structure', 'Private Markets'],
      bodyPlaceholder: true,
      sortOrder: 5,
      complianceLevel: ComplianceLevel.YELLOW,
      disclosureText: DISCLOSURE,
    },
    {
      type: ContentType.RESEARCH,
      title: 'Enterprise Software in the Computational Economy',
      slug: 'enterprise-software-computational-economy',
      summary:
        'A study of how enterprise software adapts as computation becomes a broad economic input—where durable value may accrue, and how the Computational Economy framework helps distinguish structural change from cyclical noise.',
      seoTitle: 'Enterprise Software in the Computational Economy — Research',
      metaDescription:
        'How enterprise software adapts as computation becomes a broad economic input, viewed through the Computational Economy framework.',
      categorySlug: 'enterprise-software',
      tags: ['Enterprise Software', 'Computational Economy'],
      bodyPlaceholder: true,
      sortOrder: 6,
      complianceLevel: ComplianceLevel.GREEN,
      disclosureText: DISCLOSURE,
    },
  ]
  for (const r of research) await upsertEntry(r)

  // ---------------------------------------------------------------------------
  // Related content linking
  // ---------------------------------------------------------------------------
  async function link(slugA: string, slugB: string) {
    const a = await prisma.contentEntry.findUnique({ where: { slug: slugA } })
    const b = await prisma.contentEntry.findUnique({ where: { slug: slugB } })
    if (a && b) {
      await prisma.contentEntry.update({
        where: { id: a.id },
        data: { relatedTo: { connect: { id: b.id } } },
      })
    }
  }
  await link('the-computational-economy', 'computational-economy')
  await link('evidence-over-prediction', 'three-trigger-methodology')
  await link('super-tanker-trades-essay', 'super-tanker-trades')
  await link('what-i-saw-in-biotechnology-2015', '2015-biotech-investing')
  await link('recognizing-change-before-consensus', 'pattern-recognition')
  await link('2016-crispr-gene-editing', 'pattern-recognition')
  await link('2016-crispr-gene-editing', 'computational-economy')
  await link('2016-coal-survivorship', 'super-tanker-trades')
  await link('2016-india-us-capital-markets', 'three-trigger-methodology')
  await link('2017-institutional-sponsorship', 'three-trigger-methodology')
  await link('2017-private-public-joint-venture', 'three-trigger-methodology')
  await link('2018-family-offices', 'three-trigger-methodology')
  await link('2019-artificial-intelligence-fourth-industrial-revolution', 'computational-economy')
  await link('2022-private-markets-three-trigger', 'three-trigger-methodology')
  await link('2022-private-markets-three-trigger', 'computational-economy')
  // Research → core frameworks (each Research article links to at least one framework)
  await link('ai-infrastructure-compute-buildout', 'computational-economy')
  await link('robotics-physical-intelligence', 'computational-economy')
  await link('private-markets-value-migration', 'three-trigger-methodology')
  await link('biotechnology-after-computational-turn', 'computational-economy')
  await link('market-structure-path-to-liquidity', 'three-trigger-methodology')
  await link('enterprise-software-computational-economy', 'computational-economy')

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
