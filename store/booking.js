import { defineStore } from "pinia";

export const useBooking = defineStore("booking", {
      state: () => ({
        transporters: false,
        login: false,
        categories: [
          {
            id: 1,
            icon: 'package',
            name: 'One package'
          },
          {
            id: 2,
            icon: 'trolley',
            name: 'Many packages'
          },
          {
            id: 3,
            icon: 'pallet',
            name: 'Pallet(s)'
          },
          {
            id: 4,
            icon: 'warehouse',
            name: 'Various goods'
          }
        ],
        showModal: false,
        step: 0,
        stepsProgress: 7,
        category: '',
      }),
      getters: {},
      watch: {},
      actions: {},
    }
);
