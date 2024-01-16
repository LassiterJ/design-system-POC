import {coreNumbers} from '../src/utilities/coreNumbers';
const coreNumberOptions = Object.keys(coreNumbers);
const negativeCoreNumberOptions= coreNumberOptions.map(value => `-${value}`).filter((item) => item !== "-0"); //TODO: I think this includes -0. Lets remove that.

export const layoutArgTypes = {
    p:{control: "select", options:[...coreNumberOptions]},
    px:{control: "select", options:[...coreNumberOptions]},
    py:{control: "select", options:[...coreNumberOptions]},
    pt:{control: "select", options:[...coreNumberOptions]},
    pr:{control: "select", options:[...coreNumberOptions]},
    pb:{control: "select", options:[...coreNumberOptions]},
    pl:{control: "select", options:[...coreNumberOptions]},
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
  mr:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  mb:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
  ml:{control: "select", options:["auto", ...coreNumberOptions,...negativeCoreNumberOptions]},
}
