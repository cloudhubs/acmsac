import { createGlobalState } from 'react-hooks-global-state';
import {ProphetAppData} from "./data/ProphetAppData";
import {Configuration} from "./data/Configuration";
import {ReqConfigSingle} from "./data/ReqConfigSingle";
import { createStore } from "react-hooks-global-state";


// type Action =
//   | { type: "setMultipleConfigRepo", index: number, repository: string }
//   | { type: "decrement" };

// const reducer = (state = initialState, action: Action) => {
//     switch (action.type) {
//         case "setMultipleConfigRepo":
//         return {
//             ...state,
//             backendUrl: action.repository,
//             configMultiple: [

//             ]
//         };
//         case "decrement":
//         return {
//             ...state
//         };
//         default:
//         return state;
//     }
// };



// interface InitState {
//     backendUrl: string;
//     organization: string
//     repository: string;
//     communicationGraph: string;
//     prophetAppData: any;
//     ms: string;
//     contextMap: boolean;
//     communication: boolean;
//     // configMultiple: [new ReqConfigSingle(0), new ReqConfigSingle(1)],
//     configMultiple: any[],
//     configSingle: any
//     isConfigSingle: boolean
// }

// const initialState: InitState = {
//     backendUrl: 'localhost:8080',
//     organization: 'cloudhubs',
//     repository: 'tms',
//     communicationGraph: `graph LR;
//         A-->B;
//         B-->C;
//         B-->D[name];
//       `,
//     prophetAppData: data,
//     ms: "",
//     contextMap: false,
//     communication: false,
//     // configMultiple: [new ReqConfigSingle(0), new ReqConfigSingle(1)],
//     configMultiple: [],

//     configSingle: {},
//     isConfigSingle: true
// }

// export const { dispatch, useGlobalState } = createStore(reducer, initialState);


const data: ProphetAppData = {
    global: {
        projectName: "TMS",
        communication: `graph LR;A-->B;B-->C;`,
        contextMap: `graph TD;D-->E;E-->F;F-->G;`,
    },
    ms: [
        {
            name: "msa",
            boundedContext: `graph LR;
        I-->J;
        J-->K;
        I-->W;`,
        },
    ],
    isMonolith: false
}

// const data: ProphetAppData = {
//     global: {
//         projectName: "TMS",
//         communication: ``,
//         contextMap: ``,
//     },
//     ms: [
//         {
//             name: "EMS",
//             boundedContext: ``,
//         },
//         {
//             name: "CMS",
//             boundedContext: ``,
//         },
//     ],
//     isMonolith: false
// }

function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat };
}



let rows = [];

const rows2 = async () => {
    console.log("on analyze");
    const response = await fetch('https://5e7152a1667af70016317936.mockapi.io/acmsac/papers', {
        method: 'get',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (response != null){
        const body = await response.json();
        console.log(body);
        rows = body;
    }
}

rows2();


console.log(rows);

export let { useGlobalState } = createGlobalState({
        backendUrl: 'localhost:8080',
        organization: 'cloudhubs',
        repository: 'tms',
        communicationGraph: `graph LR;
        A-->B;
        B-->C;
        B-->D[name];
      `,
        prophetAppData: data,
        loading: false,
        ms: "",
        contextMap: false,
        communication: false,
        configMultiple: [new ReqConfigSingle(), new ReqConfigSingle()],
        configSingle: {},
        isConfigSingle: true,
        rows: rows,
        otherRows: ""
    }

);

// const rows = [
//     createData('Cupcake', 305, 3.7),
//     createData('Donut', 452, 25.0),
//     createData('Eclair', 262, 16.0),
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Gingerbread', 356, 16.0),
//     createData('Honeycomb', 408, 3.2),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Jelly Bean', 375, 0.0),
//     createData('KitKat', 518, 26.0),
//     createData('Lollipop', 392, 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
//





