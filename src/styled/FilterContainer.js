import styled from "styled-components";

const FilterContainer = styled.div`
    padding: .5rem;
    background: #2b3b90;
    color: white;
    border: 1px solid black;
    border-top-right-radius: .5rem;
    border-top-left-radius: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filters{
        display: flex;
    }
    div{
        width: auto;
        margin-right: 2rem;
    }
    label{
        margin-right: .5rem;
    }
    .clear{
        margin-right: 0;
    }
`
export default FilterContainer