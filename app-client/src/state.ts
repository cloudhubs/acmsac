import { createGlobalState } from 'react-hooks-global-state';

let academicPapers = [];

// const getAcademicPapers = async () => {
//     const response = await fetch('https://5e7152a1667af70016317936.mockapi.io/acmsac/papers', {
//         method: 'get',
//         headers : {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     });
//     if (response != null){
//         const body = await response.json();
//         academicPapers = body;
//     }
// }
//
// getAcademicPapers();

export let { useGlobalState } = createGlobalState({
        academicPapers: academicPapers,
    }
);





