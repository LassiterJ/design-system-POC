import {coreNumbers} from '../src/utilities/coreNumbers';
const coreNumberOptions = Object.keys(coreNumbers).map((value) => value.replace(".", "_"));
const negativeCoreNumberOptions= coreNumberOptions.map(value => `-${value}`).filter((item) => item !== "-0");

export const layoutArgTypes = {
    p:{control: "select", options:[...coreNumberOptions]},
    px:{control: "select", options:[...coreNumberOptions]},
    py:{control: "select", options:[...coreNumberOptions]},
    pt:{control: "select", options:[...coreNumberOptions]},
    pe:{control: "select", options:[...coreNumberOptions]},
    pb:{control: "select", options:[...coreNumberOptions]},
    ps:{control: "select", options:[...coreNumberOptions]},
    position:{control: "select", options:["static", "relative", "absolute", "fixed", "sticky"]},
    inset:{control: "select", options:["auto", "0", "50%", "100%"]}, // TODO: Might add coreNumbers to the options for the positioning items
    top:{control: "select", options:["auto", "0", "50%", "100%"]},
    right:{control: "select", options:["auto", "0", "50%", "100%"]},
    bottom:{control: "select", options:["auto", "0", "50%", "100%"]},
    left:{control: "select", options:["auto", "0", "50%", "100%"]},
    width:{control:"select", options:["auto","min-content","max-content","100%", ...coreNumberOptions]},
    height:{control:"select", options:["auto","min-content","max-content","100%", ...coreNumberOptions]},
    shrink:{control:"select", options:["0","1"]},
    grow:{control:"select", options:["0", "1"]}
};

export const marginArgTypes = {
  m:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  mx:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  my:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  mt:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  me:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  mb:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  ms:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
}
