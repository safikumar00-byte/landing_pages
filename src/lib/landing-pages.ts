export type LandingPage = {
  path: string;
  title: string;
  note: string;
};

export type LandingPageGroup = {
  id: string;
  index: string;
  title: string;
  description: string;
  pages: LandingPage[];
};

export const landingPageGroups: LandingPageGroup[] = [
  {
    id: "games",
    index: "01",
    title: "Games & chance",
    description: "Spin, scratch, tap, and see what turns up.",
    pages: [
      { path: "html-categories/games/spin-wheel/Spin_Wheel.html", title: "Spin Wheel", note: "A classic prize wheel" },
      { path: "html-categories/games/spin-wheel/Spin_Wheel_files/SpinWheel.html", title: "Bonus Prize Spin", note: "A second spin, a second chance" },
      { path: "html-categories/games/SpinWheel3/SpinWheel3.html", title: "Jackpot Wheel", note: "A little drama, a big reveal" },
      { path: "html-categories/games/five/five.html", title: "Spin & Win", note: "Five ways to land a prize" },
      { path: "html-categories/games/grid-box/Grid-Box.html", title: "Grid Box", note: "A reward in three steps" },
      { path: "html-categories/games/grid/GridBox.html", title: "Tap the Grid", note: "Pick a square, find a surprise" },
      { path: "html-categories/games/gridMoney/gridMoney.html", title: "Rotating Boxes", note: "A moving prize reveal" },
      { path: "html-categories/games/holi/holi.html", title: "Holi Spin", note: "A colour-soaked seasonal game" },
      { path: "html-categories/games/lucky-spin/LuckySpinWheel.html", title: "Lucky Spin", note: "One wheel, one lucky day" },
      { path: "html-categories/games/memory-game/MemoryGame.html", title: "Memory Game", note: "A familiar matching game" },
      { path: "html-categories/games/memory-game-shuffle/MemoryGameShuffle.html", title: "Memory Shuffle", note: "The matching game, remixed" },
      { path: "html-categories/games/mystery_box/index.html", title: "Mystery Box", note: "Open a box and see what is inside" },
      { path: "html-categories/games/royalityprogram/ScratchCard.html", title: "Scratch & Win", note: "Three reveals to uncover" },
      { path: "html-categories/games/rummyculture/RummyCulture.html", title: "Rummy Culture", note: "A game-night campaign" },
      { path: "html-categories/games/rummytime/RummyTime.html", title: "Rummy Time", note: "A table-ready invitation" },
      { path: "html-categories/games/spin5/Spin5.html", title: "Royalty Spin", note: "A celebratory prize flow" },
      { path: "html-categories/games/spin6/Spin6.html", title: "Leaderboard Spin", note: "A spin with a leaderboard" },
      { path: "html-categories/games/spins-all/eight/spins.html", title: "Spin Eight", note: "A high-value prize wheel" },
      { path: "html-categories/games/spins-all/first/first.html", title: "First Spin", note: "A bright first-win moment" },
      { path: "html-categories/games/spins-all/sec/Spins.html", title: "Lucky Wheel", note: "A winner reveal" },
      { path: "html-categories/games/spins-all/six/six.html", title: "Spin Six", note: "A second jackpot variation" },
    ],
  },
  {
    id: "fintech",
    index: "02",
    title: "Credit & fintech",
    description: "Applications, eligibility, and the details in between.",
    pages: [
      { path: "html-categories/fintech/form-application/Formapplication.html", title: "Instant Loan Form", note: "A five-minute application" },
      { path: "html-categories/fintech/cbform1/CredbuddhaLandingPage.html", title: "CredBuddha Loan", note: "A four-step approval flow" },
      { path: "html-categories/fintech/cblanidngpage2/index.html", title: "CredBuddha App", note: "A mobile app introduction" },
      { path: "html-categories/fintech/landing3/Document.html", title: "Loan Eligibility", note: "A personalised offer page" },
      { path: "html-categories/fintech/lowcredit/FormLandingPage.html", title: "Low Credit Form", note: "A quick eligibility check" },
      { path: "html-categories/fintech/pirmalfinance/piramalfinance.html", title: "Piramal Finance", note: "A finance product overview" },
      { path: "html-categories/fintech/pirmalfinance5/PirmalFinance.html", title: "Piramal Eligibility", note: "A salaried applicant flow" },
    ],
  },
  {
    id: "rewards",
    index: "03",
    title: "Offers & rewards",
    description: "Promotions, loyalty, and reasons to come back.",
    pages: [
      { path: "html-categories/rewards/LowCreditOffers/LowCreditOffers.html", title: "Low Credit Offers", note: "Offers for a wider audience" },
      { path: "html-categories/rewards/lowcreditoffer/Landingpage.html", title: "Low Credit Landing", note: "A focused offer page" },
      { path: "html-categories/rewards/lowcreditrewards2/index.html", title: "LowCredit Rewards", note: "A rewards sign-in flow" },
      { path: "html-categories/rewards/lowcreditrewards3/index.html", title: "Rewards: Prize Reveal", note: "A reward-led follow-up" },
      { path: "html-categories/rewards/offer/index.html", title: "Lucky Day Offer", note: "A celebratory offer reveal" },
      { path: "html-categories/rewards/royalityprogram/games.html", title: "Loyalty: Claim Offer", note: "An offer claim with OTP" },
      { path: "html-categories/rewards/royalityprogram/index.html", title: "Rewards Login", note: "A loyalty sign-in experience" },
      { path: "html-categories/rewards/snglanding/index.html", title: "Share & Gain", note: "A referral rewards flow" },
    ],
  },
  {
    id: "followups",
    index: "04",
    title: "Success & follow-up",
    description: "The next screen after the important click.",
    pages: [
      { path: "html-categories/follow-ups/cbsuccess/index.html", title: "Application Success", note: "A clear confirmation moment" },
      { path: "html-categories/follow-ups/pirmalNew/offerPage.html", title: "Piramal Offer Success", note: "A loan approval reveal" },
    ],
  },
];

export const landingPages = landingPageGroups.flatMap((group) => group.pages);