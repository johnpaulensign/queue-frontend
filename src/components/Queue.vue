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
                    <div class="col-xl-6 col-lg-6 col-sm-12 card " v-for="actor in actors" :key="actor.id">
                        <div class="card-body">
                            <h5 class="card-title">{{ actor.actor }}</h5>

                            <!-- Display the initial checkin time formatted as HH:MM:SS -->
                            <p v-if="actor.initialCheckin != null" class="card-text">
                                Initial Checkin: {{ formatTime(actor.initialCheckin) }}
                            </p>
                            <p v-if="actor.costumeCheckin != null" class="card-text">
                                Costume Checkin: {{ formatTime(actor.costumeCheckin) }}
                            </p>
                            <p v-if="actor.makeupCheckin != null" class="card-text">
                                Makeup Checkin: {{ formatTime(actor.makeupCheckin) }}
                            </p>
                            <p v-if="actor.roomCheckin != null" class="card-text">
                                Room Checkin: {{ formatTime(actor.roomCheckin) }}
                            </p>


                            <!-- <p class="card-text">{{ actor.initialCheckin }}</p> -->
                            <!-- Button that calls nextStep with the actor's id -->
                            <div class="p-0">
                                <div class="d-flex justify-content-end">
                                    <!-- <button class="btn btn-danger" @click="nextStep(actor.id)">
                                        Remove
                                    </button> -->
                                    <button class="btn btn-success" @click="nextStep(actor.id)">
                                        Move to {{ this.nextStepName }}
                                    </button>
                                </div>
                            </div>
                            <!-- <button class="btn btn-success" @click="nextStep(actor.id)">
                                Move to {{ this.nextStepName }}
                            </button> -->
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
export default {
    name: "Queue",
    props: {
        queueName: String,
        queueRoute: String,
        queueId: String,
        actors: Array,
        nextStepName: String,
        nextStep: Function
    },
    methods: {
        formatTime(time) {
            // Create a new date object with the time
            const date = new Date(time);

            // Get the hours, minutes, and seconds
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            // Return the formatted time
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
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


/* .card {
    border: 1px solid #ccc;
} */
</style>