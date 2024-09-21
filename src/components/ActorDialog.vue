<template>
    <!-- Display a bootstrap modal the actor's name, check in times, props, notes -->
    <div class="modal fade" id="actorDialog" tabindex="-1" role="dialog" aria-labelledby="actorDialogLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="actorDialogLabel">{{ actor?.actor }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                    <div class="col-4 d-flex justify-content-end">Room</div>
                    <div class="col-8">{{ actor?.room }}</div>
                    <div class="col-4 d-flex justify-content-end">Initial Checkin</div>
                    <div class="col-8">{{ actor?.initialCheckin }}</div>
                    <div class="col-4 d-flex justify-content-end">Costume Checkin</div>
                    <div class="col-8">{{ actor?.costumeCheckin }}</div>
                    <div class="col-4 d-flex justify-content-end">Costume Artist</div>
                    <div class="col-8">{{ actor?.costumeArtist }}</div>
                    <div class="col-4 d-flex justify-content-end">Costume Props</div>
                    <div class="col-8">{{ actor?.costumeProps }}</div>
                    <div class="col-4 d-flex justify-content-end">Costume Notes</div>
                    <div class="col-8">{{ actor?.costumeNotes }}</div>
                    <div class="col-4 d-flex justify-content-end">Makeup Checkin</div>
                    <div class="col-8">{{ actor?.makeupCheckin }}</div>
                    <div class="col-4 d-flex justify-content-end">Makeup Artist</div>
                    <div class="col-8">{{ actor?.makeupArtist }}</div>
                    <div class="col-4 d-flex justify-content-end">Makeup Notes</div>
                    <div class="col-8">{{ actor?.makeupNotes }}</div>
                    <div class="col-4 d-flex justify-content-end">Room Checkin</div>
                    <div class="col-8">{{ actor?.roomCheckin }}</div>
                    <div class="col-4 d-flex justify-content-end">Final Checkout</div>
                    <div class="col-8">{{ actor?.finalCheckout }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    name: "ActorDialog",
    props: {
        actor: Object,
        queueName: String,
    }
};

</script>

<style scoped></style>