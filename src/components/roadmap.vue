<script lang="ts">

import {defineComponent} from "vue";
import Navigation from "./navigation.vue";
import router from "../router";

export default defineComponent({

  name: 'Roadmap',
  components: {Navigation},



  methods: {
    handleGroupClick(event) {
      const target = event.target;
      const group = target.closest('g');

      if (group) {
        const groupID: string = group.getAttribute("id");
        const dataLink: string = group.getAttribute("data-link");
        console.log(groupID);

        if (dataLink) {
          router.push("step_"+dataLink);
        } else {
          alert("Эта тема еще не присоединена. Подождите немножко или напишите разработчику.")
        }
      }
    },
  }

})

</script>

<template>

  <main class="step container mx-auto md:mt-6 p-4 md:p-8 rounded-xl bg-white 2xl:w-2/3 mb-10 ">

    <header class="mb-4">
      <button @click="$router.go(-1)" class="rounded-full bg-gray-200 pr-4 pl-3 py-1 text-black-300 text-sm cursor-pointer">← Назад</button>
      <h1 class="text-3xl mb-3 font-black mt-2">Карта навыков</h1>
      <p>Навыки разделены на 3 группы: основы, базовый уровень, продвинутый уровень. </p>
      <p>Ориентируйтесь по карте и отслеживайте свой прогресс. </p>

    </header>

    <svg viewBox="0 0 1944 1581" fill="none" xmlns="http://www.w3.org/2000/svg" class="roadmap">
      <g id="asql_roadmap" @click="handleGroupClick">


        <g id="Connector line_12">
          <path id="Shape_31" d="M950 374C950 372.895 949.105 372 948 372C946.896 372 946 372.895 946 374H948H950ZM852.914 1293.46C853.695 1292.68 853.695 1291.41 852.914 1290.63L840.186 1277.9C839.405 1277.12 838.139 1277.12 837.358 1277.9C836.577 1278.68 836.577 1279.95 837.358 1280.73L848.672 1292.04L837.358 1303.36C836.577 1304.14 836.577 1305.4 837.358 1306.18C838.139 1306.97 839.405 1306.97 840.186 1306.18L852.914 1293.46ZM948 374H946V438H948H950V374H948ZM924 462V460H820V462V464H924V462ZM796 486H794V1268.04H796H798V486H796ZM820 1292.04V1294.04H851.5V1292.04V1290.04H820V1292.04ZM796 1268.04H794C794 1282.4 805.641 1294.04 820 1294.04V1292.04V1290.04C807.85 1290.04 798 1280.19 798 1268.04H796ZM820 462V460C805.641 460 794 471.641 794 486H796H798C798 473.85 807.85 464 820 464V462ZM948 438H946C946 450.15 936.151 460 924 460V462V464C938.36 464 950 452.359 950 438H948Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_13">
          <path id="Shape_33" d="M198 374C198 372.895 197.105 372 196 372C194.895 372 194 372.895 194 374H196H198ZM100.914 1078.53C101.695 1077.75 101.695 1076.48 100.914 1075.7L88.1863 1062.97C87.4052 1062.19 86.1389 1062.19 85.3579 1062.97C84.5768 1063.75 84.5768 1065.02 85.3579 1065.8L96.6716 1077.12L85.3579 1088.43C84.5768 1089.21 84.5768 1090.48 85.3579 1091.26C86.1389 1092.04 87.4052 1092.04 88.1863 1091.26L100.914 1078.53ZM196 374H194V438H196H198V374H196ZM172 462V460H84V462V464H172V462ZM60 486H58V1053.12H60H62V486H60ZM84 1077.12V1079.12H99.5V1077.12V1075.12H84V1077.12ZM60 1053.12H58C58 1067.48 69.6406 1079.12 84 1079.12V1077.12V1075.12C71.8497 1075.12 62 1065.27 62 1053.12H60ZM84 462V460C69.6406 460 58 471.641 58 486H60H62C62 473.85 71.8497 464 84 464V462ZM196 438H194C194 450.15 184.15 460 172 460V462V464C186.359 464 198 452.359 198 438H196Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_14">
          <path id="Shape_35" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130H197H199ZM1792.59 1009.91C1793.37 1010.7 1794.63 1010.7 1795.41 1009.91L1808.14 997.186C1808.92 996.405 1808.92 995.139 1808.14 994.358C1807.36 993.577 1806.09 993.577 1805.31 994.358L1794 1005.67L1782.69 994.358C1781.91 993.577 1780.64 993.577 1779.86 994.358C1779.08 995.139 1779.08 996.405 1779.86 997.186L1792.59 1009.91ZM197 130H195V150H197H199V130H197ZM221 174V176H1770V174V172H221V174ZM1794 198H1792V1008.5H1794H1796V198H1794ZM1770 174V176C1782.15 176 1792 185.85 1792 198H1794H1796C1796 183.641 1784.36 172 1770 172V174ZM197 150H195C195 164.359 206.641 176 221 176V174V172C208.85 172 199 162.15 199 150H197Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_15">
          <path id="Shape_37" d="M393 596C391.895 596 391 596.895 391 598C391 599.105 391.895 600 393 600V598V596ZM420.586 804.914C421.367 805.695 422.633 805.695 423.414 804.914L436.142 792.186C436.923 791.405 436.923 790.139 436.142 789.358C435.361 788.577 434.095 788.577 433.314 789.358L422 800.672L410.686 789.358C409.905 788.577 408.639 788.577 407.858 789.358C407.077 790.139 407.077 791.405 407.858 792.186L420.586 804.914ZM393 598V600H398V598V596H393V598ZM422 622H420V803.5H422H424V622H422ZM398 598V600C410.15 600 420 609.85 420 622H422H424C424 607.641 412.359 596 398 596V598Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_16">
          <path id="Shape_38" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130H197H199ZM946.586 242.914C947.367 243.695 948.634 243.695 949.415 242.914L962.143 230.186C962.924 229.405 962.924 228.139 962.143 227.358C961.362 226.577 960.095 226.577 959.314 227.358L948 238.672L936.687 227.358C935.906 226.577 934.639 226.577 933.858 227.358C933.077 228.139 933.077 229.405 933.858 230.186L946.586 242.914ZM197 130H195V150H197H199V130H197ZM221 174V176H924V174V172H221V174ZM948 198H946V241.5H948H950V198H948ZM924 174V176C936.151 176 946 185.85 946 198H948H950C950 183.641 938.36 172 924 172V174ZM197 150H195C195 164.359 206.641 176 221 176V174V172C208.85 172 199 162.15 199 150H197Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_17">
          <path id="Shape_39" d="M519 374C519 372.895 518.105 372 517 372C515.895 372 515 372.895 515 374H517H519ZM420.586 804.914C421.367 805.695 422.633 805.695 423.414 804.914L436.142 792.186C436.923 791.405 436.923 790.139 436.142 789.358C435.361 788.577 434.095 788.577 433.314 789.358L422 800.672L410.686 789.358C409.905 788.577 408.639 788.577 407.858 789.358C407.077 790.139 407.077 791.405 407.858 792.186L420.586 804.914ZM517 374H515V708H517H519V374H517ZM493 732V730H446V732V734H493V732ZM422 756H420V803.5H422H424V756H422ZM446 732V730C431.641 730 420 741.641 420 756H422H424C424 743.85 433.85 734 446 734V732ZM517 708H515C515 720.15 505.15 730 493 730V732V734C507.359 734 519 722.359 519 708H517Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_19">
          <path id="Shape_45" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130H197H199ZM1490.59 242.914C1491.37 243.695 1492.63 243.695 1493.41 242.914L1506.14 230.186C1506.92 229.405 1506.92 228.139 1506.14 227.358C1505.36 226.577 1504.09 226.577 1503.31 227.358L1492 238.672L1480.69 227.358C1479.91 226.577 1478.64 226.577 1477.86 227.358C1477.08 228.139 1477.08 229.405 1477.86 230.186L1490.59 242.914ZM197 130H195V150H197H199V130H197ZM221 174V176H1468V174V172H221V174ZM1492 198H1490V241.5H1492H1494V198H1492ZM1468 174V176C1480.15 176 1490 185.85 1490 198H1492H1494C1494 183.641 1482.36 172 1468 172V174ZM197 150H195C195 164.359 206.641 176 221 176V174V172C208.85 172 199 162.15 199 150H197Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_20">
          <path id="Shape_47" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130L197 130L199 130ZM1635.59 804.914C1636.37 805.695 1637.63 805.695 1638.41 804.914L1651.14 792.186C1651.92 791.405 1651.92 790.139 1651.14 789.358C1650.36 788.577 1649.09 788.577 1648.31 789.358L1637 800.672L1625.69 789.358C1624.91 788.577 1623.64 788.577 1622.86 789.358C1622.08 790.139 1622.08 791.405 1622.86 792.186L1635.59 804.914ZM197 130L195 130L195 150L197 150L199 150L199 130L197 130ZM221 174L221 176L1613 176L1613 174L1613 172L221 172L221 174ZM1637 198L1635 198L1635 803.5L1637 803.5L1639 803.5L1639 198L1637 198ZM1613 174L1613 176C1625.15 176 1635 185.85 1635 198L1637 198L1639 198C1639 183.641 1627.36 172 1613 172L1613 174ZM197 150L195 150C195 164.359 206.641 176 221 176L221 174L221 172C208.85 172 199 162.15 199 150L197 150Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_21">
          <path id="Shape_48" d="M1639 932C1639 930.895 1638.1 930 1637 930C1635.9 930 1635 930.895 1635 932H1637H1639ZM1490.59 1226.91C1491.37 1227.7 1492.63 1227.7 1493.41 1226.91L1506.14 1214.19C1506.92 1213.41 1506.92 1212.14 1506.14 1211.36C1505.36 1210.58 1504.09 1210.58 1503.31 1211.36L1492 1222.67L1480.69 1211.36C1479.91 1210.58 1478.64 1210.58 1477.86 1211.36C1477.08 1212.14 1477.08 1213.41 1477.86 1214.19L1490.59 1226.91ZM1637 932H1635V1158H1637H1639V932H1637ZM1613 1182V1180H1516V1182V1184H1613V1182ZM1492 1206H1490V1225.5H1492H1494V1206H1492ZM1516 1182V1180C1501.64 1180 1490 1191.64 1490 1206H1492H1494C1494 1193.85 1503.85 1184 1516 1184V1182ZM1637 1158H1635C1635 1170.15 1625.15 1180 1613 1180V1182V1184C1627.36 1184 1639 1172.36 1639 1158H1637Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_22">
          <path id="Shape_49" d="M1639 932C1639 930.895 1638.1 930 1637 930C1635.9 930 1635 930.895 1635 932H1637H1639ZM1794.59 1226.91C1795.37 1227.7 1796.63 1227.7 1797.41 1226.91L1810.14 1214.19C1810.92 1213.41 1810.92 1212.14 1810.14 1211.36C1809.36 1210.58 1808.09 1210.58 1807.31 1211.36L1796 1222.67L1784.69 1211.36C1783.91 1210.58 1782.64 1210.58 1781.86 1211.36C1781.08 1212.14 1781.08 1213.41 1781.86 1214.19L1794.59 1226.91ZM1637 932H1635V1153H1637H1639V932H1637ZM1661 1177V1179H1772V1177V1175H1661V1177ZM1796 1201H1794V1225.5H1796H1798V1201H1796ZM1772 1177V1179C1784.15 1179 1794 1188.85 1794 1201H1796H1798C1798 1186.64 1786.36 1175 1772 1175V1177ZM1637 1153H1635C1635 1167.36 1646.64 1179 1661 1179V1177V1175C1648.85 1175 1639 1165.15 1639 1153H1637Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_23">
          <path id="Shape_50" d="M950 374C950 372.895 949.105 372 948 372C946.896 372 946 372.895 946 374H948H950ZM946.586 804.914C947.367 805.695 948.634 805.695 949.415 804.914L962.143 792.186C962.924 791.405 962.924 790.139 962.143 789.358C961.362 788.577 960.095 788.577 959.314 789.358L948 800.672L936.687 789.358C935.906 788.577 934.639 788.577 933.858 789.358C933.077 790.139 933.077 791.405 933.858 792.186L946.586 804.914ZM948 374H946V438H948H950V374H948ZM972 462V464H1396V462V460H972V462ZM1420 486H1418V708H1420H1422V486H1420ZM1396 732V730H972V732V734H1396V732ZM948 756H946V803.5H948H950V756H948ZM972 732V730C957.641 730 946 741.641 946 756H948H950C950 743.85 959.85 734 972 734V732ZM1420 708H1418C1418 720.15 1408.15 730 1396 730V732V734C1410.36 734 1422 722.359 1422 708H1420ZM1396 462V464C1408.15 464 1418 473.85 1418 486H1420H1422C1422 471.641 1410.36 460 1396 460V462ZM948 438H946C946 452.359 957.641 464 972 464V462V460C959.85 460 950 450.15 950 438H948Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_24">
          <path id="Shape_51" d="M950 374C950 372.895 949.105 372 948 372C946.896 372 946 372.895 946 374H948H950ZM946.586 534.914C947.367 535.695 948.634 535.695 949.415 534.914L962.143 522.186C962.924 521.405 962.924 520.139 962.143 519.358C961.362 518.577 960.095 518.577 959.314 519.358L948 530.672L936.687 519.358C935.906 518.577 934.639 518.577 933.858 519.358C933.077 520.139 933.077 521.405 933.858 522.186L946.586 534.914ZM948 374H946V533.5H948H950V374H948Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_25">
          <path id="Shape_53" d="M651 932C651 930.895 650.105 930 649 930C647.895 930 647 930.895 647 932H649H651ZM547.086 1509.41C546.305 1510.19 546.305 1511.45 547.086 1512.23L559.814 1524.96C560.595 1525.74 561.861 1525.74 562.642 1524.96C563.423 1524.18 563.423 1522.91 562.642 1522.13L551.328 1510.82L562.642 1499.51C563.423 1498.72 563.423 1497.46 562.642 1496.68C561.861 1495.9 560.595 1495.9 559.814 1496.68L547.086 1509.41ZM649 932H647V1486.82H649H651V932H649ZM625 1510.82V1508.82H548.5V1510.82V1512.82H625V1510.82ZM649 1486.82H647C647 1498.97 637.15 1508.82 625 1508.82V1510.82V1512.82C639.359 1512.82 651 1501.18 651 1486.82H649Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_26">
          <path id="Shape_54" d="M356 1512.82C357.105 1512.82 358 1511.92 358 1510.82C358 1509.71 357.105 1508.82 356 1508.82V1510.82V1512.82ZM291.086 1509.41C290.305 1510.19 290.305 1511.45 291.086 1512.23L303.814 1524.96C304.595 1525.74 305.861 1525.74 306.642 1524.96C307.423 1524.18 307.423 1522.91 306.642 1522.13L295.328 1510.82L306.642 1499.51C307.423 1498.72 307.423 1497.46 306.642 1496.68C305.861 1495.9 304.595 1495.9 303.814 1496.68L291.086 1509.41ZM356 1510.82V1508.82H292.5V1510.82V1512.82H356V1510.82Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_27">
          <path id="Shape_55" d="M198 1366C198 1364.9 197.105 1364 196 1364C194.895 1364 194 1364.9 194 1366H196H198ZM194.586 1447.55C195.367 1448.33 196.633 1448.33 197.414 1447.55L210.142 1434.82C210.923 1434.04 210.923 1432.78 210.142 1432C209.361 1431.22 208.095 1431.22 207.314 1432L196 1443.31L184.686 1432C183.905 1431.22 182.639 1431.22 181.858 1432C181.077 1432.78 181.077 1434.04 181.858 1434.82L194.586 1447.55ZM196 1366H194V1446.14H196H198V1366H196Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_28">
          <path id="Shape_56" d="M950 932C950 930.895 949.105 930 948 930C946.895 930 946 930.895 946 932H948H950ZM946.586 1009.91C947.367 1010.7 948.633 1010.7 949.414 1009.91L962.142 997.186C962.923 996.405 962.923 995.139 962.142 994.358C961.361 993.577 960.095 993.577 959.314 994.358L948 1005.67L936.686 994.358C935.905 993.577 934.639 993.577 933.858 994.358C933.077 995.139 933.077 996.405 933.858 997.186L946.586 1009.91ZM948 932H946V1008.5H948H950V932H948Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_18">
          <path id="Shape_41" d="M1044 866C1042.9 866 1042 866.895 1042 868C1042 869.105 1042.9 870 1044 870V868V866ZM1378.59 1013.15C1379.37 1013.93 1380.63 1013.93 1381.41 1013.15L1394.14 1000.42C1394.92 999.637 1394.92 998.371 1394.14 997.59C1393.36 996.809 1392.09 996.809 1391.31 997.59L1380 1008.9L1368.69 997.59C1367.91 996.809 1366.64 996.809 1365.86 997.59C1365.08 998.371 1365.08 999.637 1365.86 1000.42L1378.59 1013.15ZM1044 868V870H1356V868V866H1044V868ZM1380 892H1378V1011.73H1380H1382V892H1380ZM1356 868V870C1368.15 870 1378 879.85 1378 892H1380H1382C1382 877.641 1370.36 866 1356 866V868Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line">
          <path id="Shape_5" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130L197 130L199 130ZM195.586 242.914C196.367 243.695 197.633 243.695 198.414 242.914L211.142 230.186C211.923 229.405 211.923 228.139 211.142 227.358C210.361 226.577 209.095 226.577 208.314 227.358L197 238.672L185.686 227.358C184.905 226.577 183.639 226.577 182.858 227.358C182.077 228.139 182.077 229.405 182.858 230.186L195.586 242.914ZM197 130L195 130L195 241.5L197 241.5L199 241.5L199 130L197 130Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_2">
          <path id="Shape_6" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130L197 130L199 130ZM1218.59 242.914C1219.37 243.695 1220.63 243.695 1221.41 242.914L1234.14 230.186C1234.92 229.405 1234.92 228.139 1234.14 227.358C1233.36 226.577 1232.09 226.577 1231.31 227.358L1220 238.672L1208.69 227.358C1207.91 226.577 1206.64 226.577 1205.86 227.358C1205.08 228.139 1205.08 229.405 1205.86 230.186L1218.59 242.914ZM197 130L195 130L195 150L197 150L199 150L199 130L197 130ZM221 174L221 176L1196 176L1196 174L1196 172L221 172L221 174ZM1220 198L1218 198L1218 241.5L1220 241.5L1222 241.5L1222 198L1220 198ZM1196 174L1196 176C1208.15 176 1218 185.85 1218 198L1220 198L1222 198C1222 183.641 1210.36 172 1196 172L1196 174ZM197 150L195 150C195 164.359 206.641 176 221 176L221 174L221 172C208.85 172 199 162.15 199 150L197 150Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_3">
          <path id="Shape_8" d="M248.5 662C248.5 660.895 247.605 660 246.5 660C245.395 660 244.5 660.895 244.5 662L246.5 662L248.5 662ZM194.586 804.914C195.367 805.695 196.633 805.695 197.414 804.914L210.142 792.186C210.923 791.405 210.923 790.139 210.142 789.358C209.361 788.577 208.095 788.577 207.314 789.358L196 800.672L184.686 789.358C183.905 788.577 182.639 788.577 181.858 789.358C181.077 790.139 181.077 791.405 181.858 792.186L194.586 804.914ZM246.5 662L244.5 662L244.5 709L246.5 709L248.5 709L248.5 662L246.5 662ZM222.5 733L222.5 731L220 731L220 733L220 735L222.5 735L222.5 733ZM196 757L194 757L194 803.5L196 803.5L198 803.5L198 757L196 757ZM220 733L220 731C205.641 731 194 742.641 194 757L196 757L198 757C198 744.85 207.85 735 220 735L220 733ZM246.5 709L244.5 709C244.5 721.15 234.65 731 222.5 731L222.5 733L222.5 735C236.859 735 248.5 723.359 248.5 709L246.5 709Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_4">
          <path id="Shape_9" d="M198 374C198 372.895 197.105 372 196 372C194.895 372 194 372.895 194 374L196 374L198 374ZM245.086 534.914C245.867 535.695 247.133 535.695 247.914 534.914L260.642 522.186C261.423 521.405 261.423 520.139 260.642 519.358C259.861 518.577 258.595 518.577 257.814 519.358L246.5 530.672L235.186 519.358C234.405 518.577 233.139 518.577 232.358 519.358C231.577 520.139 231.577 521.405 232.358 522.186L245.086 534.914ZM196 374L194 374L194 430L196 430L198 430L198 374L196 374ZM220 454L220 456L222.5 456L222.5 454L222.5 452L220 452L220 454ZM246.5 478L244.5 478L244.5 533.5L246.5 533.5L248.5 533.5L248.5 478L246.5 478ZM222.5 454L222.5 456C234.65 456 244.5 465.85 244.5 478L246.5 478L248.5 478C248.5 463.641 236.859 452 222.5 452L222.5 454ZM196 430L194 430C194 444.359 205.641 456 220 456L220 454L220 452C207.85 452 198 442.15 198 430L196 430Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_6">
          <path id="Shape_15" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130L197 130L199 130ZM515.586 242.914C516.367 243.695 517.633 243.695 518.414 242.914L531.142 230.186C531.923 229.405 531.923 228.139 531.142 227.358C530.361 226.577 529.095 226.577 528.314 227.358L517 238.672L505.686 227.358C504.905 226.577 503.639 226.577 502.858 227.358C502.077 228.139 502.077 229.405 502.858 230.186L515.586 242.914ZM197 130L195 130L195 150L197 150L199 150L199 130L197 130ZM221 174L221 176L493 176L493 174L493 172L221 172L221 174ZM517 198L515 198L515 241.5L517 241.5L519 241.5L519 198L517 198ZM493 174L493 176C505.15 176 515 185.85 515 198L517 198L519 198C519 183.641 507.359 172 493 172L493 174ZM197 150L195 150C195 164.359 206.641 176 221 176L221 174L221 172C208.85 172 199 162.15 199 150L197 150Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_11">
          <path id="Shape_27" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130H197H199ZM1585.09 1508.77C1584.3 1509.55 1584.3 1510.81 1585.09 1511.59L1597.81 1524.32C1598.59 1525.1 1599.86 1525.1 1600.64 1524.32C1601.42 1523.54 1601.42 1522.28 1600.64 1521.49L1589.33 1510.18L1600.64 1498.87C1601.42 1498.09 1601.42 1496.82 1600.64 1496.04C1599.86 1495.26 1598.59 1495.26 1597.81 1496.04L1585.09 1508.77ZM197 130H195V150H197H199V130H197ZM221 174V176H1908V174V172H221V174ZM1932 198H1930V1486.18H1932H1934V198H1932ZM1908 1510.18V1508.18H1586.5V1510.18V1512.18H1908V1510.18ZM1932 1486.18H1930C1930 1498.33 1920.15 1508.18 1908 1508.18V1510.18V1512.18C1922.36 1512.18 1934 1500.54 1934 1486.18H1932ZM1908 174V176C1920.15 176 1930 185.85 1930 198H1932H1934C1934 183.641 1922.36 172 1908 172V174ZM197 150H195C195 164.359 206.641 176 221 176V174V172C208.85 172 199 162.15 199 150H197Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_5">
          <path id="Shape_13" d="M199 130C199 128.895 198.105 128 197 128C195.895 128 195 128.895 195 130H197H199ZM100.914 1301.37C101.695 1300.59 101.695 1299.32 100.914 1298.54L88.1863 1285.82C87.4052 1285.03 86.1389 1285.03 85.3579 1285.82C84.5768 1286.6 84.5768 1287.86 85.3579 1288.64L96.6716 1299.96L85.3579 1311.27C84.5768 1312.05 84.5768 1313.32 85.3579 1314.1C86.1389 1314.88 87.4052 1314.88 88.1863 1314.1L100.914 1301.37ZM197 130H195V150H197H199V130H197ZM173 174V172H36V174V176H173V174ZM12 198H10V1275.96H12H14V198H12ZM36 1299.96V1301.96H99.5V1299.96V1297.96H36V1299.96ZM12 1275.96H10C10 1290.32 21.6406 1301.96 36 1301.96V1299.96V1297.96C23.8497 1297.96 14 1288.11 14 1275.96H12ZM36 174V172C21.6406 172 10 183.641 10 198H12H14C14 185.85 23.8497 176 36 176V174ZM197 150H195C195 162.15 185.15 172 173 172V174V176C187.359 176 199 164.359 199 150H197Z" fill="#D9D9D9"/>
        </g>
        <g id="Connector line_9">
          <path id="Shape_22" d="M950 374C950 372.895 949.105 372 948 372C946.896 372 946 372.895 946 374H948H950ZM1216.59 534.914C1217.37 535.695 1218.63 535.695 1219.41 534.914L1232.14 522.186C1232.92 521.405 1232.92 520.139 1232.14 519.358C1231.36 518.577 1230.09 518.577 1229.31 519.358L1218 530.672L1206.69 519.358C1205.91 518.577 1204.64 518.577 1203.86 519.358C1203.08 520.139 1203.08 521.405 1203.86 522.186L1216.59 534.914ZM948 374H946V438H948H950V374H948ZM972 462V464H1194V462V460H972V462ZM1218 486H1216V533.5H1218H1220V486H1218ZM1194 462V464C1206.15 464 1216 473.85 1216 486H1218H1220C1220 471.641 1208.36 460 1194 460V462ZM948 438H946C946 452.359 957.641 464 972 464V462V460C959.85 460 950 450.15 950 438H948Z" fill="#D9D9D9"/>
        </g>

        <g id="Connector line_10">
          <path id="Shape_25" d="M1044 866C1042.9 866 1042 866.895 1042 868C1042 869.105 1042.9 870 1044 870V868V866ZM1206.59 1226.91C1207.37 1227.7 1208.63 1227.7 1209.41 1226.91L1222.14 1214.19C1222.92 1213.41 1222.92 1212.14 1222.14 1211.36C1221.36 1210.58 1220.09 1210.58 1219.31 1211.36L1208 1222.67L1196.69 1211.36C1195.91 1210.58 1194.64 1210.58 1193.86 1211.36C1193.08 1212.14 1193.08 1213.41 1193.86 1214.19L1206.59 1226.91ZM1044 868V870H1184V868V866H1044V868ZM1208 892H1206V1225.5H1208H1210V892H1208ZM1184 868V870C1196.15 870 1206 879.85 1206 892H1208H1210C1210 877.641 1198.36 866 1184 866V868Z" fill="#D9D9D9"/>
        </g>

        <g id="Connector line_7">
          <path id="Shape_17" d="M519 374C519 372.895 518.105 372 517 372C515.895 372 515 372.895 515 374L517 374L519 374ZM647.586 804.914C648.367 805.695 649.633 805.695 650.414 804.914L663.142 792.186C663.923 791.405 663.923 790.139 663.142 789.358C662.361 788.577 661.095 788.577 660.314 789.358L649 800.672L637.686 789.358C636.905 788.577 635.639 788.577 634.858 789.358C634.077 790.139 634.077 791.405 634.858 792.186L647.586 804.914ZM517 374L515 374L515 565L517 565L519 565L519 374L517 374ZM541 589L541 591L625 591L625 589L625 587L541 587L541 589ZM649 613L647 613L647 803.5L649 803.5L651 803.5L651 613L649 613ZM625 589L625 591C637.15 591 647 600.85 647 613L649 613L651 613C651 598.641 639.359 587 625 587L625 589ZM517 565L515 565C515 579.359 526.641 591 541 591L541 589L541 587C528.85 587 519 577.15 519 565L517 565Z" fill="#D9D9D9"/>
        </g>

        <g id="Connector line_8">
          <path id="Shape_19" d="M651 932C651 930.895 650.105 930 649 930C647.895 930 647 930.895 647 932L649 932L651 932ZM546.086 1075.7C545.305 1076.48 545.305 1077.75 546.086 1078.53L558.814 1091.26C559.595 1092.04 560.861 1092.04 561.642 1091.26C562.423 1090.48 562.423 1089.21 561.642 1088.43L550.328 1077.12L561.642 1065.8C562.423 1065.02 562.423 1063.75 561.642 1062.97C560.861 1062.19 559.595 1062.19 558.814 1062.97L546.086 1075.7ZM649 932L647 932L647 1053.12L649 1053.12L651 1053.12L651 932L649 932ZM625 1077.12L625 1075.12L547.5 1075.12L547.5 1077.12L547.5 1079.12L625 1079.12L625 1077.12ZM649 1053.12L647 1053.12C647 1065.27 637.15 1075.12 625 1075.12L625 1077.12L625 1079.12C639.359 1079.12 651 1067.48 651 1053.12L649 1053.12Z" fill="#D9D9D9"/>
        </g>



        <g id="select" data-level="1" data-enabled="1" data-link="1">
          <rect id="Shape" x="105" y="14" width="184" height="108" rx="6"   />
          <text id="Text" transform="translate(121 50)" fill="black" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="30.7337" y="26.7273">SELECT</tspan></text>
        </g>
        <g id="where" data-level="1" data-enabled="1" data-link="12">
          <rect id="Shape_2" x="108" y="250" width="176" height="116" rx="6"   />
          <text id="Text_2" transform="translate(124 290)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="28.955" y="26.7273">WHERE</tspan></text>
        </g>
        <g id="order_limit" data-level="1" data-enabled="1" data-link="8">
          <rect id="Shape_3" x="1132" y="250" width="176" height="116" rx="6"   />
          <text id="Text_3" transform="translate(1148 272)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="28.2923" y="26.7273">ORDER,&#10;</tspan><tspan x="40.3808" y="62.7273">LIMIT</tspan></text>
        </g>
        <g id="and_or" data-level="2" data-enabled="1">
          <rect id="Shape_4" x="108" y="812" width="176" height="112" rx="6"  />
          <text id="Text_4" transform="translate(124 850)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="26.9798" y="26.7273">AND OR</tspan></text>
        </g>
        <g id="comparision" data-level="1" data-enabled="1">
          <rect id="Shape_7" x="108" y="542" width="277" height="112" rx="6"  />
          <text id="Text_5" transform="translate(124 580)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="43.7043" y="26.7273">COMPARSION</tspan></text>
        </g>
        <g id="types" data-level="1" data-enabled="1">
          <rect id="Shape_10" x="860" y="250" width="176" height="116" rx="6" />
          <text id="Text_6" transform="translate(876 290)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="33.2206" y="26.7273">TYPES</tspan></text>
        </g>
        <g id="numeric" data-level="1" data-enabled="1">
          <rect id="Shape_11" x="860" y="542" width="176" height="112" rx="6"  />
          <text id="Text_7" transform="translate(876 580)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="17.7625" y="26.7273">NUMERIC</tspan></text>
        </g>
        <g id="window" data-level="3" data-enabled="1">
          <rect id="Shape_12" x="108" y="1241.92" width="176" height="116.085" rx="6"  />
          <text id="Text_8" transform="translate(124 1281.92)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="19.7025" y="26.7273">WINDOW</tspan></text>
        </g>

        <g id="aggregation" data-level="1" data-enabled="1">
          <rect id="Shape_14" x="385" y="250" width="264" height="116" rx="6"  />
          <text id="Text_9" transform="translate(401 290)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="29.8737" y="26.7273">AGGREGATION</tspan></text>
        </g>

        <g id="group_by" data-level="2" data-enabled="1">
          <rect id="Shape_16" x="561" y="812" width="176" height="112" rx="6"  />
          <text id="Text_10" transform="translate(577 850)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="14.8328" y="26.7273">GROUPBY</tspan></text>
        </g>

        <g id="having" data-enabled="1" data-level="2">
          <rect id="Shape_18" x="363" y="1020.23" width="176" height="113.768" rx="6" />
          <text id="Text_11" transform="translate(379 1059.23)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="27.1556" y="26.7273">HAVING</tspan></text>
        </g>

        <g id="INTERVAL" data-enabled="1" data-level="2">
          <rect id="Shape_20" x="860" y="1017" width="176" height="113.768" rx="6" />
          <text id="Text_12" transform="translate(876 1056)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="16.139" y="26.7273">INTERVAL</tspan></text>
        </g>

        <g id="STRING" data-enabled="1" data-level="1">
          <rect id="Shape_21" class="fill-blue-500" x="1130" y="542" width="176" height="112" rx="6"  />
          <text id="Text_13" transform="translate(1146 580)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="28.6791" y="26.7273">STRING</tspan></text>
        </g>

        <g id="date" data-enabled="1" data-level="2">
          <rect id="Shape_23" x="860" y="812" width="176" height="112" rx="6"  />
          <text id="Text_14" transform="translate(876 850)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="42.0395" y="26.7273">DATE</tspan></text>
        </g>

        <g id="time_zones" data-enabled="0" data-level="3">
          <rect id="Shape_24" x="1120" y="1234" width="176" height="116.085" rx="6"  />
          <text id="Text_15" transform="translate(1136 1274)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="1.43091" y="26.7273">TIME ZONES</tspan></text>
        </g>

        <g id="CTE" data-enabled="0" data-level="3">
          <rect id="Shape_26" x="1402" y="1454" width="176" height="112.362" rx="6"  />
          <text id="Text_16" transform="translate(1418 1492)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="48.5849" y="26.7273">CTE</tspan></text>
        </g>

        <g id="RANKING" data-enabled="0" data-level="3">
          <rect id="Shape_28" x="108" y="1454.64" width="176" height="112.362" rx="6" />
          <text id="Text_17" transform="translate(124 1492.64)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="19.1102" y="26.7273">RANKING</tspan></text>
        </g>

        <g id="SUB QUERIES" data-enabled="0" data-level="3">
          <rect id="Shape_29" x="1710" y="1454" width="176" height="112.362" rx="6"  />
          <text id="Text_18" transform="translate(1726 1474)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="45.0863" y="26.7273">SUB </tspan><tspan x="22.1453" y="62.7273">QUERIES</tspan></text>
        </g>

        <g id="JSON" data-enabled="0" data-level="3">
          <rect id="Shape_30" x="860" y="1234" width="176" height="116.085" rx="6" />
          <text id="Text_19" transform="translate(876 1274)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="40.1527" y="26.7273">JSON</tspan></text>
        </g>

        <g id="CASE WHEN" data-enabled="1" data-level="2" data-link="90">
          <rect id="Shape_32" x="108" y="1020.23" width="176" height="113.768" rx="6" />
          <text id="Text_20" transform="translate(124 1059.23)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="1.7654" y="26.7273">CASE WHEN</tspan></text>
        </g>

        <g id="SET" data-enabled="0" data-level="2">
          <rect id="Shape_34" x="1706" y="1017" width="176" height="113.768" rx="6"  />
          <text id="Text_21" transform="translate(1722 1056)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="49.6865" y="26.7273">SET</tspan></text>
        </g>

        <g id="EXTRACT" data-enabled="0" data-level="2">
          <rect id="Shape_40" x="1292" y="1020.23" width="176" height="113.768" rx="6" />
          <text id="Text_23" transform="translate(1308 1059.23)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="17.9618" y="26.7273">EXTRACT</tspan></text>
        </g>

        <g id="MANY TO MANY" data-enabled="1" data-level="3">
          <rect id="Shape_42" x="1404" y="1234" width="176" height="116.085" rx="6" />
          <text id="Text_24" transform="translate(1420 1256)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="14.2288" y="26.7273">MANY TO </tspan><tspan x="36.3324" y="62.7273">MANY</tspan></text>
        </g>

        <g id="SELF JOIN" data-enabled="0" data-level="3">
          <rect id="Shape_43" x="1708" y="1234" width="176" height="116.085" rx="6" /> >
          <text id="Text_25" transform="translate(1724 1274)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="13.8474" y="26.7273">SELF JOIN</tspan></text>
        </g>

        <g id="ALIAS AS" data-enabled="1" data-level="1" data-link="26">
          <rect id="Shape_44" x="1404" y="250" width="176" height="116" rx="6" fill="#CDF4D3" />
          <text id="Text_26" transform="translate(1420 290)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="bold" letter-spacing="-0.019em"><tspan x="18.389" y="26.7273">ALIAS AS</tspan></text>
        </g>

        <g id="JOIN" data-enabled="1" data-level="2">
          <rect id="Shape_46" x="1549" y="812" width="176" height="112" rx="6"  />
          <text id="Text_27" transform="translate(1565 850)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="44.641" y="26.7273">JOIN</tspan></text>
        </g>

        <g id="PARTITION OVER" data-enabled="0" data-level="3">
          <rect id="Shape_52" x="364" y="1454.64" width="176" height="112.362" rx="6"  />
          <text id="Text_28" transform="translate(380 1474.64)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="7.70044" y="26.7273">PARTITION </tspan><tspan x="40.5277" y="62.7273">OVER</tspan></text>
        </g>

        <g id="FILTER" data-enabled="1" data-level="2">
          <rect id="Shape_36" x="334" y="812" width="176" height="112" rx="6"  />
          <text id="Text_22" transform="translate(350 850)" fill="black" fill-opacity="0.8" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="-0.019em"><tspan x="34.4564" y="26.7273">FILTER</tspan></text>
        </g>

      </g>
    </svg>

  </main>
  <!-- /.container -->


</template>

<style scoped>

  .roadmap g{
    cursor:  pointer;
    fill: black;

  }
  
  .roadmap g text{
    font-family:  Arial,serif !important;
  }

  g[data-enabled="0"] text {
    fill: #aaa;
  }

  g[data-enabled="1"] text {
    font-weight: bold;
  }


  g[data-level="1"] rect {
    /* Бронза */
    fill: #faecda !important;
    color: white !important;
  }

  g[data-level="2"] rect {
    /* Серебро */
    fill: #e8edf1 !important;
    color: white !important;
  }

  g[data-level="3"] rect {
    /* Золото */
    fill: #f8f1cd !important;
    color: white !important;
  }
</style>