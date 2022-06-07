import Image from 'next/image';

export default function Testimonials() {
  return(
    <div id="testimonials">
      <dl className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-20 lg:grid-cols-2 lg:gap-x-20">
        <div>
          <dt>
            <img className="w-16 h-auto rounded-full mb-2" src="/testimonials/maxwellcdavis.jpeg"/>
            <p className="text-2xl text-gray-700">Great stuff - a space that needs a cost effective product!</p>
          </dt>
          <dd className="mt-3 text-xl font-medium text-gray-500">@maxwellcdavis</dd>
        </div>
        <div>
          <dt>
            <img className="w-16 h-auto rounded-full mb-2" src="/testimonials/foliofed.jpeg"/>
            <p className="text-2xl text-gray-700">Reflio.com by @richiemcilroy is privacy conscious and doesn't break the bank. It's still in beta but I'm excited about it.</p>
          </dt>
          <dd className="mt-3 text-xl font-medium text-gray-500">@foliofed</dd>
        </div>
        <div>
          <dt>
            <img className="w-16 h-auto rounded-full mb-2" src="/testimonials/briansaetre.jpeg"/>
            <p className="text-2xl text-gray-700">Fun idea. I've been looking for an affordable service like this too. Wasn't impressed by the market's current offerings the last time I looked. Great domain name too!</p>
          </dt>
          <dd className="mt-3 text-xl font-medium text-gray-500">@BrianSaetre</dd>
        </div>
        <div>
          <dt>
            <img className="w-16 h-auto rounded-full mb-2" src="/testimonials/_thunk_.jpeg"/>
            <p className="text-2xl text-gray-700">Richie, I've just seen this thread on Reflio. Great idea and it looks mint!</p>
          </dt>
          <dd className="mt-3 text-xl font-medium text-gray-500">@_thunk_</dd>
        </div>
      </dl>
    </div>
  );
}