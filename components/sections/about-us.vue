<template>
  <section class="bg-[#F5F7FA] py-10 lg:py-20">
    <div class="container">
      <div class="flex justify-between sm:items-center md:flex-row flex-col-reverse">
        <img
            src="https://blog.advesa.com/wp-content/uploads/2019/11/about-us-page.png"
            class="md:w-[45%] w-full"
            alt=""
        />
        <div class="sm:w-[70%] w-[90%] md:w-[45%] text-slate-1000 lg:text-xl text-sm">
          <h2 class=" lg:mb-8 text-blue-950 md:text-left text-center font-bold lg:text-6xl text-2xl md:mb-4 mb-2">
            {{ $t('aboutUs.title') }}
          </h2>
          <p class="lg:text-xl md:text-base text-sm !leading-relaxed sm:mb-0 mb-4">
            {{ $t('aboutUs.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
