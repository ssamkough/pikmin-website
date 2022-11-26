import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import theme from '../../../styles/theme';
import BodyContainer from '../../library/BodyContainer';
import Text from '../../library/Text';

const CSV_FILE_NAME = 'progress.csv';
const CSV_FILE_URL = `https://api.github.com/repos/projectPiki/pikmin2/contents/tools/${CSV_FILE_NAME}`;

/**
 * Only the "name" and "download_url" fields are needed
 * @ref https://docs.github.com/en/rest/repos/contents#get-repository-content
 */
interface GithubAPIGetRepositoryContentResponse {
  name: string;
  download_url: string;
}

/**
 * These fields are not from the original progress.csv, but are used
 * for the charts to make them more digestable
 */
interface ChartData {
  codeCompletionInReadablePercantage: string;
  dataCompletionInReadablePercantage: string;
}

/**
 * Fields were manually transferred from the progress.csv file
 * @ref https://github.com/projectPiki/pikmin2/blob/main/tools/progress.csv
 */
interface RawPikminProgress {
  codeCountInPokos: number;
  codeCompletionInBytes: number;
  codeCompletionInPercentage: number;
  dataCountInTreasures: number;
  dataCompletionInBytes: number;
  dataCompletionInPercentage: number;
  sentence: string;
  createdAt: string;
}

type PikminProgress = ChartData & RawPikminProgress;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array: any): array is any[] => array?.length !== undefined;

const nf = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  unit: 'percent',
  maximumFractionDigits: 2,
});
const formattedPercentage = (stringifiedProgressPercentage: string) => {
  const percentage = parseFloat(stringifiedProgressPercentage) * 100;
  return nf.format(percentage);
};

const dtf = new Intl.DateTimeFormat('en-US');
const formattedCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);
  return dtf.format(date);
};

const Charts = (): React.ReactElement => {
  const [pikmin2Response, setPikmin2Response] = useState<GithubAPIGetRepositoryContentResponse>();
  const [pikmin2Progress, setPikmin2Progress] = useState<PikminProgress[]>();

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const { data } = await axios.get<GithubAPIGetRepositoryContentResponse>(CSV_FILE_URL);
        setPikmin2Response(data);
      } catch {
        console.log('Failed to fetch csv!');
      }
    };

    fetchCSV();
  }, []);

  useEffect(() => {
    if (pikmin2Response?.name === CSV_FILE_NAME) {
      Papa.parse(pikmin2Response.download_url, {
        download: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data } = results;
          if (data && isArray(data)) {
            // remove first element which contains the headers
            data.shift();
            setPikmin2Progress(
              data.map((row) => ({
                codeCountInPokos: parseInt(row[0]),
                codeCompletionInBytes: parseInt(row[1]),
                codeCompletionInPercentage: parseInt(row[2]),
                codeCompletionInReadablePercantage: formattedPercentage(row[2]),
                dataCountInTreasures: parseInt(row[3]),
                dataCompletionInBytes: parseInt(row[4]),
                dataCompletionInPercentage: parseInt(row[5]),
                dataCompletionInReadablePercantage: formattedPercentage(row[5]),
                sentence: row[6],
                createdAt: formattedCreatedAt(row[7]),
              })),
            );
          }
        },
      });
    }
  }, [pikmin2Response]);

  return (
    <BodyContainer>
      <Text variant="h2" color="white">
        pikmin 2 progress: {pikmin2Progress?.[pikmin2Progress?.length - 1]?.sentence}
      </Text>
      {pikmin2Progress && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={pikmin2Progress}>
            <XAxis dataKey="createdAt" stroke="#FFFFFF" strokeWidth={2.5} />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              stroke="#FFFFFF"
              strokeWidth={2.5}
            />
            <Tooltip />
            <Legend />
            <Line
              dataKey="codeCompletionInReadablePercantage"
              name="code completion"
              type="monotone"
              stroke={theme.colors.pink}
              strokeWidth={5}
              dot={false}
            />
            <Line
              dataKey="dataCompletionInReadablePercantage"
              name="data completion"
              type="monotone"
              stroke={theme.colors.lightPink}
              strokeWidth={5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </BodyContainer>
  );
};

export default Charts;
