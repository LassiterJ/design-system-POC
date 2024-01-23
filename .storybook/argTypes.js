import { coreNumbers, fractionalUnits, fractionalUnitsCSSMap } from '../src/utilities/js/coreNumbers';
const coreNumberOptions = Object.keys(coreNumbers).map((value) => value.replace(".", "_"));
const negativeCoreNumberOptions= coreNumberOptions.map(value => `-${value}`).filter((item) => item !== "-0");
const fractionalKeys = Object.keys(fractionalUnits);
console.log("fractionalUnitsCSSMap: ", fractionalUnitsCSSMap);
export const layoutArgTypes = {
    p:{control: "select", options:[...coreNumberOptions]},
    px:{control: "select", options:[...coreNumberOptions]},
    py:{control: "select", options:[...coreNumberOptions]},
    pt:{control: "select", options:[...coreNumberOptions]},
    pe:{control: "select", options:[...coreNumberOptions]},
    pb:{control: "select", options:[...coreNumberOptions]},
    ps:{control: "select", options:[...coreNumberOptions]},
    position:{control: "select", options:["static", "relative", "absolute", "fixed", "sticky"]},
    inset:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys], mapping: fractionalUnitsCSSMap},
    top:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsCSSMap},
    right:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsCSSMap},
    bottom:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsCSSMap},
    left:{control: "select", options:["auto", ...coreNumberOptions, ...fractionalKeys],mapping: fractionalUnitsCSSMap},
    width:{control:"select", options:["auto","min-content","max-content","100%", ...coreNumberOptions, ...fractionalKeys], mapping: fractionalUnitsCSSMap},
    height:{control:"select", options:["auto","min-content","max-content","100%", ...coreNumberOptions, ...fractionalKeys], mapping: fractionalUnitsCSSMap},
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
