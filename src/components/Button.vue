<script setup>
const props=defineProps({
    colorButton:{
        type:String,
        default:"default"
    },
    disableButton:{
        type:Boolean,
        default:false
    },
    typeButton:{
        type:String,
        default:"button"
    },
    isLoading:{
        type:Boolean,
        default:false
    },
    positionButton:{
        type:String,
        default:"relative"
    }
})

function colorButton(){
    if(props.colorButton == "default") return `bg-blue-800 ${props.positionButton}`;
    if(props.colorButton == "edit") return `bg-yellow-600 ${props.positionButton}`;
    if(props.colorButton == "cancel") return `bg-gray-600 ${props.positionButton}`;
    if(props.colorButton == "delete") return `bg-red-600 ${props.positionButton}`;
    if(props.colorButton == "transparent") return `bg-black/40 ${props.positionButton}`;
    if(props.colorButton == "alter") return `bg-gradient-to-r from-black to-blue-900 shadow-md shadow-black ${props.positionButton}`;
}

</script>

<template>
    <button :class="colorButton()" class="text-slate-200 p-2 rounded-md disabled:bg-gray-500" :type="typeButton" :disabled="props.disableButton">
        <span :class="{'invisible':props.isLoading}">
            <slot ></slot>
        </span>
        <div v-show="props.isLoading" class="w-6 h-6 rounded-full border-4 animate-spin border-l-transparent absolute top-1/2 -mt-3 left-1/2 -ml-3"></div>
    </button>
</template>