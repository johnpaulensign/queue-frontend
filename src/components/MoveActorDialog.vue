<template>
    <!-- Display a button that opens a modal containing a form with a dropdown for Artist (populated via artists[] prop), and a input for Notes -->
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#moveActorDialog' + actor.id">
            Move to {{ nextStepName }}
        </button>
        <div class=" modal fade" :id="'moveActorDialog' + actor.id" tabindex="-1" role="dialog"
            :aria-labelledby="'moveActorDialogLabel' + actor.id" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'moveActorDialogLabel' + actor.id">
                            Move {{ actor.actor }} to {{ nextStepName }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group" v-if="nextStepName == 'Makeup' || nextStepName == 'Room'">
                                <label for="artist">Artist</label>
                                <select class="form-control" :id="'artist' + actor.id" v-model="selectedArtist">
                                    <option v-for="artist in artistNameList" :key="artist" :value="artist">
                                        {{ artist }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group" v-if="nextStepName == 'Makeup'">
                                <label :for="'props' + actor.id">Props</label>
                                <textarea class="form-control" :id="'props' + actor.id" rows="2"
                                    v-model="selectedProps" />
                            </div>
                            <!-- <div class="form-group" v-if="nextStepName == 'Room'">
                                <div class="form-group">
                                    <label for="room">Room</label>
                                    <select class="form-control" :id="'room' + actor.id" v-model="selectedRoom">
                                        <option v-for="room in roomNameList" :key="room" :value="room">
                                            {{ room }}
                                        </option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="form-group" v-if="nextStepName == 'Makeup' || nextStepName == 'Room'">
                                <label :for="'notes' + actor.id">Notes</label>
                                <textarea class="form-control" :id="'notes' + actor.id" rows="3" v-model="notes" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save">
                            Move to {{ nextStepName }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "MoveActorDialog",
    props: {
        // artists: Array,
        actor: Object,
        nextStep: Function,
        nextStepName: String,
        roomNameList: Array,
        artistNameList: Array
    },
    data() {
        return {
            selectedArtist: null,
            selectedRoom: "",
            selectedProps: "",
            notes: "",
        };
    },
    watch: {
    },
    methods: {
        save() {
            let actorCopy = {
                ...this.actor
            };


            actorCopy.selectedArtist = this.selectedArtist;
            actorCopy.notes = this.notes;
            actorCopy.selectedProps = this.selectedProps;
            actorCopy.selectedRoom = this.selectedRoom;

            // console.log("Actor Copy:", actorCopy);
            // console.log("Selected Artist:", this.selectedArtist);
            // console.log("Notes:", this.notes);
            this.nextStep(actorCopy);
        },
    },
};

</script>

<style scoped></style>