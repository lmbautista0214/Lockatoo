export const HowItWorks = () => {
  const steps = [
    {
      title: "Find a Location",
      desc: "Browse available locker locations near you using our interactive map",
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "Book a Locker",
      desc: "Select your preferred size and duration, then complete your booking",
      color: "from-orange-400 to-red-400",
    },
    {
      title: "Start Using",
      desc: "Access your locker with your unique code, anytime you need",
      color: "from-purple-500 to-indigo-400",
    },
  ];

  return (
    <div className="bg-[#f5efe6] py-5 md:py-20 px-5 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a38]">
        How It Works
      </h2>

      <p className="mt-3 text-gray-600">Get started in three simple steps</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-16">
        {steps.map((s, i) => (
          <div
            key={i}
            className="max-w-xs text-center transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative flex justify-center">
              <div
                className={`w-20 h-20 rounded-2xl bg-linear-to-br ${s.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
              >
                {i + 1}
              </div>
            </div>

            <h3 className="mt-6 text-lg md:text-xl font-semibold text-[#1e2a38]">
              {s.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
