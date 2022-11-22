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
 * Fields were manually transferred from the progress.csv file
 * @ref https://github.com/projectPiki/pikmin2/blob/main/tools/progress.csv
 */
interface PikminProgress {
  codeCountInPokos: number;
  codeCompletionInBytes: number;
  codeCompletionInPercentage: number;
  dataCountInTreasures: number;
  dataCompletionInBytes: number;
  dataCompletionInPercentage: number;
  sentence: string;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array: any): array is any[] => array?.length !== undefined;

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
                dataCountInTreasures: parseInt(row[3]),
                dataCompletionInBytes: parseInt(row[4]),
                dataCompletionInPercentage: parseInt(row[5]),
                sentence: row[6],
                createdAt: new Intl.DateTimeFormat('en-US').format(new Date(row[7])),
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
        pikmin 1 progress: TBD
      </Text>
      <Text variant="h2" color="white">
        pikmin 2 progress: {pikmin2Progress?.[pikmin2Progress?.length - 1]?.sentence}
      </Text>
      {pikmin2Progress && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={pikmin2Progress}>
            <XAxis dataKey="createdAt" stroke="#FFFFFF" strokeWidth={2.5} />
            <YAxis stroke="#FFFFFF" strokeWidth={2.5} />
            <Tooltip />
            <Legend />
            <Line
              dataKey="codeCountInPokos"
              type="monotone"
              stroke={theme.colors.pink}
              strokeWidth={5}
            />
            <Line
              dataKey="dataCountInTreasures"
              type="monotone"
              stroke={theme.colors.lightPink}
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </BodyContainer>
  );
};

export default Charts;
