import { NonIdealState } from '@blueprintjs/core';
import { ApiQueryResults } from 'common';
import React, { FC } from 'react';
import bigNumberConfig from '../../utils/bigNumberConfig';
import {
    BigNumber,
    BigNumberContainer,
    BigNumberLabel,
    SimpleStatisticsWrapper,
} from './SimpleStatistics.styles';

interface Props {
    data: ApiQueryResults | undefined;
    label?: string;
}

const SimpleStatistic: FC<Props> = ({ data, label }) => {
    const bigNumber = bigNumberConfig(data);
    const validData = bigNumber && data?.rows.length && label;
    return (
        <>
            {validData ? (
                <SimpleStatisticsWrapper>
                    <BigNumberContainer>
                        {label && <BigNumberLabel>{label}</BigNumberLabel>}
                        <BigNumber>{bigNumber}</BigNumber>
                    </BigNumberContainer>
                </SimpleStatisticsWrapper>
            ) : (
                <div style={{ padding: '50px 0' }}>
                    <NonIdealState
                        title="No data available"
                        description="Query metrics and dimensions with results."
                        icon="chart"
                    />
                </div>
            )}
        </>
    );
};

export default SimpleStatistic;
