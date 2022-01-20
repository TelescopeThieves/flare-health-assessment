import styled from "styled-components";

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    .stats{
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        border-left: 1px solid black;
        display: flex;
        align-items: stretch;
        justify-content: flex-end;
        width: 100%;
    }
    .stats > div {
        width: 6rem;
        border-right: 1px solid black;
        text-align: center;
        padding: .5rem;
    }
    .stats .mean{
        border-right: 0;
    }
    .codes{
        font-weight: bold;
    }
    `
    export default Stats
    // div {
    //     display: flex;
    //     align-items: stretch;
    //     justify-content: flex-end;
    //     div{
    //         width: 6rem;
    //         border-right: 1px solid black;
    //         text-align: center;
    //         padding: .5rem;
    //         font-size: 1rem;
    //     }
    // }