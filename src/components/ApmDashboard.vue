<template>
    <div>
        <!-- div to space elements to the ends -->
        <div class="d-flex justify-content-between p-2">
            <a href="/apm/dashboard">
                <h1>APM Dashboard</h1>
            </a>
            <!-- Button that opens a modal containing a text field for an Actor's name, a button to cancel, and a button to Checkin, which calls initialCheckin with the actors name -->
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#checkinModal">
                Check-in
            </button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="checkinModal" ref="checkinModal" tabindex="-1" role="dialog"
            aria-labelledby="checkinModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="checkinModalLabel">Check-in</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <select class="form-control" v-model="actorName">
                            <option v-for="actor in actorNameList" :key="actor" :value="actor">
                                {{ actor }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"
                            @click="initialCheckin">Check-in</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row p-2">

            <!-- Checked In -->
            <Queue :class="this.queue != null ? queue : ''" queueName="Checked In" queueId="checkedin"
                :actors="checkedinActors" nextStepName="Costume" :nextStep="costumeCheckin" :queueRoute="this.queue" />

            <!-- Costume -->
            <Queue :class="this.queue != null ? queue : ''" queueName="Costume" queueId="costume"
                :actors="costumeActors" nextStepName="Makeup" :nextStep="makeupCheckin" :queueRoute="this.queue"
                :artistNameList="artistNameList" />
            <!-- :queueRoute="this.queue" /> -->
            <!-- <div class="col-md-6" :hidden="this.queue != undefined && this.queue != 'costume'">
                <h2 class="mt-5">Costume</h2>
                <div class="card" v-for="actor in costumeActors" :key="actor.id">
                    <div class="card-body">
                        <h5 class="card-title"> actor.actor </h5>
                        <p class="card-text">{{ actor.costumeCheckin }}</p> -->
            <!-- Button that calls makeupCheckin with the actor's id -->
            <!-- <button @click="makeupCheckin(actor)">Send to Makeup</button>
                    </div>
                </div>
            </div> -->

            <!-- Makeup -->
            <Queue :class="this.queue != null ? queue : ''" queueName="Makeup" queueId="makeup" :actors="makeupActors"
                nextStepName="Room" :nextStep="roomCheckin" :queueRoute="this.queue" :roomNameList="roomNameList"
                :artistNameList="artistNameList" />

            <!-- <div class="col-md-6" :hidden="this.queue != undefined && this.queue != 'makeup'">
                <h2 class="mt-5">Makeup</h2>
                <div class="card" v-for="actor in makeupActors" :key="actor.id">
                    <div class="card-body">
                        <h5 class="card-title"> actor.actor </h5>
                        <p class="card-text">{{ actor.makeupCheckin }}</p> -->
            <!-- Button that calls roomCheckin with the actor's id -->
            <!-- <button @click="roomCheckin(actor)">Send to Room</button>
                    </div>
                </div>
            </div> -->

            <!-- Room -->
            <Queue :class="this.queue != null ? queue : ''" queueName="Room" queueId="room" :actors="roomActors"
                nextStepName="Complete" :nextStep="finalCheckout" :queueRoute="this.queue" />

            <!-- <div class="col-md-6" :hidden="this.queue != undefined && this.queue != 'room'">
                <h2 class="mt-5">Rooms</h2>
                <div class="card" v-for="actor in roomActors" :key="actor.id">
                    <div class="card-body">
                        <h5 class="card-title"> actor.actor </h5>
                        <p class="card-text">{{ actor.roomCheckin }}</p> -->
            <!-- Button that will call finalCheckout with the actors id as a parameter -->
            <!-- <button @click="finalCheckout(actor)">Final Checkout</button>
                    </div>
                </div>
            </div> -->

            <!-- Checked Out -->
            <!-- Make a scrollable bootstrap accordion with all of the checked out actors and all of there times -->
            <div class="accordion px-0 mt-3" id="accordionExample" :hidden="this.queue != null">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                Checked Out
                            </button>
                            <!-- down arrow icon-->
                        </h2>

                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">v</button>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="actor in checkedoutActors" :key="actor.id">
                                <h3> {{ actor.actor }} </h3>
                                <p>Initial Checkin: {{ actor.initialCheckin }}</p>
                                <p>Final Checkout: {{ actor.finalCheckout }}</p>
                                <p>Total time between checkin and checkout in minutes: {{ (new Date(actor.finalCheckout)
                                    - new Date(actor.initialCheckin)) / 60000 }}</p>
                            </div>
                            <!-- <div class="accordion" id="accordionExampletwp">
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="true"
                                                aria-controls="collapseTwo">
                                                <h5> actor.actor </h5>
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                        data-parent="#accordionExampletwp">
                                        <div class="card-body">
                                            <div v-for="actor in checkedoutActors" :key="actor.id">
                                                <p>{{ actor.finalCheckout }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <!-- Add another accordion in here, with the actor name as the link and when expanded <p> tages for each of the dates -->
                            <!-- <div class="accordion" id="accordionExample1">
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="true"
                                                aria-controls="collapseTwo">
                                                <h5>{{ actor.name }}</h5>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                        data-parent="#accordionExample1">
                                        <div class="card-body">
                                            <div v-for="actor in checkedoutActors" :key="actor.id">
                                                <p>{{ actor.finalCheckout }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- <div>
                <h2 class="mt-5">Checked Out</h2>
                <div v-for="actor in checkedoutActors" :key="actor.id">
                    <h5> actor.actor </h5>
                    <p>{{ actor.finalCheckout }}</p>
                </div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
// import the ApmDataService module
import ApmDataService from "@/services/ApmDataService";
import Queue from './Queue.vue'

// props that stores a list of actors from /api/apm
export default {
    name: "ApmDashboard",
    props: {
        queue: String,
    },
    data() {
        return {
            actorName: "",
            actorNameList: [],
            roomNameList: [],
            artistNameList: [],
            actors: [],
            checkedinActors: [],
            costumeActors: [],
            makeupActors: [],
            roomActors: [],
            checkedoutActors: [],
        };
    },
    methods: {
        // get list of actors from /api/apm
        retrieveActors() {
            // call the API
            ApmDataService.getAll()
                .then(response => {
                    this.actors = response.data;
                    // filter actors by status
                    this.checkedinActors = this.actors.filter(actor => actor.initialCheckin != null && actor.costumeCheckin == null && actor.makeupCheckin == null && actor.roomCheckin == null && actor.finalCheckout == null);
                    this.costumeActors = this.actors.filter(actor => actor.initialCheckin != null && actor.costumeCheckin != null && actor.makeupCheckin == null && actor.roomCheckin == null && actor.finalCheckout == null);
                    this.makeupActors = this.actors.filter(actor => actor.initialCheckin != null && actor.costumeCheckin != null && actor.makeupCheckin != null && actor.roomCheckin == null && actor.finalCheckout == null);
                    this.roomActors = this.actors.filter(actor => actor.initialCheckin != null && actor.costumeCheckin != null && actor.makeupCheckin != null && actor.roomCheckin != null && actor.finalCheckout == null);
                    this.checkedoutActors = this.actors.filter(actor => actor.finalCheckout != null);
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // call the API to add a new actor with the name in the actorName field
        initialCheckin() {
            // console.log(this.actorName);
            ApmDataService.checkin(this.actorName)
                .then(() => {
                    // console.log(response.data);
                    this.retrieveActors();
                    this.actorName = "";
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // call the API to update the actor's costumeCheckin field to the current date
        costumeCheckin(actor) {
            // console.log(actor);
            ApmDataService.costumeCheckin(actor)
                .then(() => {
                    // console.log(response.data);
                    this.retrieveActors();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // call the API to update the actor's makeupCheckin field to the current date
        makeupCheckin(actor) {
            // console.log(actor);
            ApmDataService.makeupCheckin(actor)
                .then(() => {
                    // console.log(response.data);
                    this.retrieveActors();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // call the API to update the actor's roomCheckin field to the current date
        roomCheckin(actor) {
            // console.log(actor);
            ApmDataService.roomCheckin(actor)
                .then(() => {
                    // console.log(response.data);
                    this.retrieveActors();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // call the API to update the actor's checkedOut field to the current date
        finalCheckout(actor) {
            // console.log(actor);
            ApmDataService.finalCheckout(actor)
                .then(() => {
                    // console.log(response.data);
                    this.retrieveActors();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        focusActorNameInput() {
            this.$refs.actorNameInput.focus();
        }
    },
    // call retrieveActors() when the component is created
    created() {
        this.retrieveActors();

        ApmDataService.getActors().then(response => this.actorNameList = response);
        ApmDataService.getArtists().then(response => this.artistNameList = response);
        ApmDataService.getRooms().then(response => { this.roomNameList = response; console.log(response); });
        // console.log(this.queue);
    },
    mounted() {
        // document.querySelector('#checkinModal').on('shown.bs.modal', this.focusActorNameInput);
    },
    components: { Queue }
};
</script>

<style scoped>
.queue {
    min-height: 75vh !important;
}
</style>