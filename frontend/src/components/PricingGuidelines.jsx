import React from 'react'

const PricingGuidelines = () => {
  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-[#ffeddf]">
        <h3 className="text-lg font-bold mb-4">Pricing Guidelines</h3>

        <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#980dfa]"></span>
              <b>Small Lockers:</b> Suitable for bags, small items, and personal belongings
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#980dfa]"></span>
              <b>Medium Lockers:</b> Ideal for luggage, sports equipment, and medium packages
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#980dfa]"></span>
              <b>Large Lockers:</b> Perfect for large suitcases, bulk items, and multiple packages
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#980dfa]"></span>
              Consider offering discounts for longer rental periods to encourage weekly and monthly bookings
            </li>
        </ul>

      </div>
    </>

  )
}

export default PricingGuidelines;