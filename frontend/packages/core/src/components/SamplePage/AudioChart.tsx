import Audio, {AudioProps} from '~/components/Audio';
import React, {FunctionComponent, useCallback, useState} from 'react';
import SampleChart, {SampleChartBaseProps, SampleEntityProps} from '~/components/SamplePage/SampleChart';

import {format} from 'd3-format';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const formatter = format('.5~s');

const StyledAudio = styled(Audio)`
    width: 100%;
    flex-shrink: 1;
    align-self: stretch;
`;

const cache = 5 * 60 * 1000;

type AudioChartProps = {
    audioContext?: AudioContext;
} & SampleChartBaseProps;

const AudioChart: FunctionComponent<AudioChartProps> = ({audioContext, ...props}) => {
    const {t} = useTranslation(['sample', 'common']);

    const [sampleRate, setSampleRate] = useState<string>('--Hz');

    const onLoading = useCallback(() => setSampleRate('--Hz'), []);
    const onLoad = useCallback<NonNullable<AudioProps['onLoad']>>(
        audio => setSampleRate(formatter(audio.sampleRate) + 'Hz'),
        []
    );

    const content = useCallback(
        (props: SampleEntityProps) => (
            <StyledAudio audioContext={audioContext} {...props} onLoading={onLoading} onLoad={onLoad} />
        ),
        [onLoading, onLoad, audioContext]
    );

    return (
        <SampleChart
            type="audio"
            cache={cache}
            footer={
                <span>
                    {t('sample:sample-rate')}
                    {t('common:colon')}
                    {sampleRate}
                </span>
            }
            content={content}
            {...props}
        />
    );
};

export default AudioChart;
