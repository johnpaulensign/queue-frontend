<template>
    <div :class="this.queueRoute == this.queueId ? 'col-12 tall' : 'col-md-6 p-0'"
        :hidden="this.queueRoute != undefined && this.queueRoute !== this.queueId">
        <div class="m-1 " id="queue">
            <!-- link to route with queueId -->
            <div class="queue-header mb-2 p-3">
                <a :href="'/apm/dashboard/' + this.queueId">
                    <h2 class="mb-0">{{ queueName }}</h2>
                </a>
            </div>
            <div :class="'row m-0 vh-33 ' + (this.queueRoute != null ? 'tall' : '')">
                <div v-if="actors.length > 0">
                    <div class="col-12 card " v-for="actor in actors" :key="actor.id">
                        <div class="card-body row">

                            <div class="d-flex  align-items-stretch col-3 p-0">
                                <button type="button" class="card-title flex-fill m-0 btn btn-primary"
                                    data-toggle="modal" :data-target="'#actorDialog'" @click="selectActor(actor)">
                                    {{ actor.actor }}
                                </button>
                            </div>

                            <!-- Display the initial checkin time formatted as HH:MM:SS -->
                            <div class="col-6 d-flex justify-content-center align-items-center">

                                <!-- <span v-if="actor.initialCheckin != null && nextStepName == 'Costume'"
                                    class="card-text">
                                    Checked In At: {{ formatTime(actor.initialCheckin) }}
                                </span>
                                <span v-if="actor.costumeCheckin != null && nextStepName == 'Makeup'" class="card-text">
                                    Moved to costume at: {{ formatTime(actor.costumeCheckin) }}
                                </span>
                                <span v-if="actor.makeupCheckin != null && nextStepName == 'Room'" class="card-text">
                                    Moved to makeup at: {{ formatTime(actor.makeupCheckin) }}
                                </span>
                                <span v-if="actor.roomCheckin != null" class="card-text">
                                    Moved to room at: {{ formatTime(actor.roomCheckin) }}
                                </span> -->
                                <div v-if="actor?.room" class="card-text">
                                    <p>
                                        Room: {{ actor.room }}
                                    </p>
                                    <p>
                                        Description: {{ actor.roomDescription }}
                                    </p>
                                </div>
                            </div>


                            <!-- <p class="card-text">{{ actor.initialCheckin }}</p> -->
                            <!-- Button that calls nextStep with the actor's id -->
                            <div class="p-0 col-3 d-flex justify-content-end">
                                <!-- <button class="btn btn-danger" @click="nextStep(actor.id)">
                                        Remove
                                    </button> -->
                                <MoveActorDialog :actor="actor" :nextStep="nextStep" :nextStepName="nextStepName"
                                    :roomNameList="this.roomNameList" :artistNameList="artistNameList"
                                    v-if="actor.costumeCheckin != null && actor.roomCheckin == null" />
                                <!-- <button class="btn btn-success" @click="nextStep(actor.id)">
                                        Move to {{ this.nextStepName }}
                                    </button> -->
                                <button v-if="actor.costumeCheckin == null || actor.roomCheckin != null"
                                    class="btn btn-success" @click="nextStep(actor)">
                                    Move to {{ this.nextStepName }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center">
                    <div class="card col-xl-6 col-lg-6 col-sm-12">
                        <div class="card-body">
                            <p class="card-text"> No actors found</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MoveActorDialog from "./MoveActorDialog";

export default {
    name: "Queue",
    props: {
        queueName: String,
        queueRoute: String,
        queueId: String,
        actors: Array,
        nextStepName: String,
        nextStep: Function,
        roomNameList: Array,
        artistNameList: Array
    },
    data() {
        return {
            selectedActor: null
        };
    },
    emits: ["selectActor"],
    components: {
        MoveActorDialog,
    },
    watch: {
        roomNameList() {
            console.log("Room Name List queue:", this.roomNameList);
        }
    },
    methods: {
        selectActor(actor) {
            console.log("Selected Actor:", actor);
            this.$emit("selectActor", actor);
        },
        formatTime(time) {
            // Create a new date object with the time
            const date = new Date(time);

            // Get the hours, minutes, and seconds
            const hours = date.getHours();
            const minutes = date.getMinutes();
            // const seconds = date.getSeconds();

            // Return the formatted time
            // return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }
    }
};
</script>

<style scoped>
/* Add some styling to the Queue component */
#queue {
    /* border: 1px solid #ccc; */
    /* padding: 3px; */
    background-color: #ddd;

    /* min height should be 1 quarter of the screen */
    min-height: 40vh;

    /* padding: 10px; */
}

.vh-33 {
    min-height: 33vh;
}

.tall {
    min-height: 75vh !important;
}

.queue-header {
    background-color: #ccc;
}

.display-inline {
    display: inline-block !important;
}

/* 
.card-title {
    display: inline-block;
} */

/* .card {
    border: 1px solid #ccc;
} */
</style>