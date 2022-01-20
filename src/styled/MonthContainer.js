import styled from "styled-components";

const MonthContainer = styled.div`
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    width: 100%;
    div{
        width: 6rem;
        border-right: 1px solid black;
        text-align: center;
        padding: .5rem;
        font-weight: bold;
    }
    .result{
        border-right: none;
    }
`
export default MonthContainer