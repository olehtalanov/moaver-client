<template>
    <div class="mb-8 mt-5">
        <div v-for="step in steps" :key="step.id">
            <div
                    v-show="step.id === store.currentStep"
                    class="max-h-[60vh] overflow-y overflow-x-hidden custom-scroll"
            >
                <div class="flex flex-wrap">
                    <div
                            class="p-2.5"
                            v-for="(field, index) in step.fields"
                            :key="`field-${index}`"
                            :class="field.className"
                            v-show="!field.hidden && store.form[field.controlName]"
                    >
                        <component
                                :is="getFieldName(field.fieldType)"
                                :id="field.controlName"
                                v-model="store.form[field.controlName][0]"
                                v-bind="field.attrs"
                                v-if="!field.hidden && store.form[field.controlName]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getFieldName } from "~/helpers/field-type";
import { useBooking } from "~/store/booking";

const store = useBooking();

defineProps(['steps']);
</script>
