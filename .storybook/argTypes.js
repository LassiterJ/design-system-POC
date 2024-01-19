import { coreNumbers, fractionalUnits, fractionalUnitsKeyMap } from '../src/utilities/coreNumbers';
const coreNumberOptions = Object.keys(coreNumbers).map((value) => value.replace(".", "_"));
const negativeCoreNumberOptions= coreNumberOptions.map(value => `-${value}`).filter((item) => item !== "-0");
const fractionalKeys = Object.keys(fractionalUnits);
console.log("fractionalUnitsKeyMap: ", fractionalUnitsKeyMap);
export const layoutArgTypes = {
    p:{control: "select", options:[...coreNumberOptions]},
    px:{control: "select", options:[...coreNumberOptions]},
    py:{control: "select", options:[...coreNumberOptions]},
    pt:{control: "select", options:[...coreNumberOptions]},
    pe:{control: "select", options:[...coreNumberOptions]},
    pb:{control: "select", options:[...coreNumberOptions]},
    ps:{control: "select", options:[...coreNumberOptions]},
    position:{control: "select", options:["static", "relative", "absolute", "fixed", "sticky"]},
    inset:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys], mapping: fractionalUnitsKeyMap}, // TODO: Might add coreNumbers to the options for the positioning items
    top:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsKeyMap},
    right:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsKeyMap},
    bottom:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsKeyMap},
    left:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsKeyMap},
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
