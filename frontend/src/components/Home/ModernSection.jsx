export const ModernSection = () => {
  return (
    <section className="bg-white py-5 md:py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co/DD6D7xfC/lockatoo.png"
            alt="locker"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Modern & Convenient
          </h2>

          <p className="mt-4 text-gray-600">
            Our state-of-the-art locker facilities are designed with your
            convenience in mind. Clean, secure, and easy to use.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-400 text-white">
                ✓
              </span>
              24/7 monitoring
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-400 text-white">
                ✓
              </span>
              Multiple sizes
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-400 text-white">
                ✓
              </span>
              Secure system
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
