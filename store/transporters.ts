import {defineStore} from "pinia";
import {useConfig} from "~/store/config";
import { KeyValue } from "~/types/forms";

type CurrentState = {
    showModal: boolean;
    currentStep: number;
    currentStepName: string;
    form: Partial<{ [p: string]: any }>
}

export const useTransporters = defineStore("transporters", {
    state: (): CurrentState => ({
        showModal: false,
        currentStep: 1,
        currentStepName: '',
        form: {
            companyName: [null, ['required']],
            houseNumber: [null, ['required']],
            postCode: [null, ['required']],
            country: [null, ['required']],
            street: [null, ['required']],
            phone: [null, ['required']],
            email: [null, ['required']],
            services: [[]],
            serviceQuantity: [],
            quantities: [[]],
            commerceNumber: [null, ['required']],
            iban: [null, ['required']],
            vat: [null, ['required']],
            locations: [null, ['required']],
            name: [null, ['required']],
            address: [null, ['required']],
            phoneNumber: [null, ['required']], // ???
            password: [null, ['required']],
            repeatPassword: [null, ['required', 'password']],
            agreeToTerms: [false],
        }
    }),

    getters: {
        countries(): KeyValue[] {
            const config = useConfig();

            return config.countries.map((it: { id: number; name: string; }): KeyValue => ({
                key: it.id,
                value: it.name
            }));
        },

        nextStepAvailable(): boolean {
            const {
                companyName,
                houseNumber,
                postCode,
                country,
                street,
                phone,
                email
            } = this.form;

            switch (this.currentStep) {
                case 1:
                    return [
                        companyName,
                        houseNumber,
                        postCode,
                        country,
                        street,
                        phone,
                        email
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => !!it[0]);
                default:
                    return true;
            }
        }
    },

    actions: {
        toggleModal(toState: boolean | undefined = undefined) {
            if (toState !== undefined) {
                this.showModal = toState;
            } else {
                this.showModal = !this.showModal;
            }

            this.currentStep = 1;
        },

        setCurrentStep(name: string, direction: 'increment' | 'decrement') {
            this.currentStepName = name;

            if (direction === 'increment') {
                this.currentStep++;
            } else {
                this.currentStep--;
            }
        }
    },
});
