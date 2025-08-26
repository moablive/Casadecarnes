import { defineComponent } from "vue";
import Navbar from "../navbar/Navbar.vue";
import allPaidUnpaid from "./allPaidUnpaid/allPaidUnpaid.vue";
import ProximosVencimentos from "./ProximosVencimentos/ProximosVencimentos.vue";
import Map from "./map/map.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navbar,
    allPaidUnpaid,
    ProximosVencimentos,
    Map,
  },
});