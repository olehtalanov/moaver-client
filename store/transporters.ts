import { defineStore } from "pinia";
import { useConfig } from "~/store/config";
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
            postCode: [null, ['required']],
            country: [124, ['required']],
            location: [null, ['required']],
            address: [null, ['required']],
            phone: [null, ['required']],
            email: [null, ['required']],
            services: [[], ['required']],
            vehicles: [{}, ['required']],
            commerceNumber: [null, ['required']],
            iban: [null, ['required']],
            vat: [null, ['required']],
            locations: [[], ['required']],
            name: [null, ['required']],
            personalPhone: [null, ['required']],
            personalEmail: [null, ['required']],
            password: [null, ['required']],
            confirmPassword: [null, ['required', 'password']],
            agreeToTerms: [false, ['required']],
        }
    }),

    getters: {
        countries(): KeyValue[] {
            const config = useConfig();

            return config.countries.map((it: {
                id: number;
                name: string;
            }): KeyValue => ({
                key: it.id,
                value: it.name
            }));
        },

        nextStepAvailable(): boolean {
            const {
                companyName,
                postCode,
                country,
                location,
                address,
                phone,
                email,
                services,
                vehicles,
                commerceNumber,
                iban,
                vat,
                name,
                personalPhone,
                personalEmail,
                password,
                confirmPassword,
                agreeToTerms,
                locations
            } = this.form;

            switch (this.currentStep) {
                case 1:
                    return [
                        companyName,
                        location,
                        postCode,
                        country,
                        address,
                        phone,
                        email
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => !!it[0]);
                case 2:
                    return [
                        services
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => it[0].length > 0);
                case 3:
                    return [
                        vehicles
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => {
                            return !!it[0]
                        });
                case 4:
                    return [
                        locations
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => {
                            return it[0].length > 0 ? it[0].every((element: any) => {
                                return element.country !== '' && element.city !== '';
                            }) : ''
                        });
                case 5:
                    return [
                        commerceNumber,
                        iban,
                        vat
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => !!it[0]);
                case 6:
                    return [
                        name,
                        personalPhone,
                        personalEmail,
                        password,
                        confirmPassword,
                        agreeToTerms
                    ]
                        .filter((it: any[]) => it[1].includes('required'))
                        .every((it) => !!it[0] && it[0]);
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
