import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import App from '../components/App';
import Image from '../components/Image';
import Link from '../components/Link';
import Text from '../components/Text';

const CSV_FILE_NAME = 'progress.csv';
const CSV_FILE_URL = `https://api.github.com/repos/projectPiki/pikmin2/contents/tools/${CSV_FILE_NAME}`;
const GITHUB_ORGANIZATION_URL = 'https://github.com/projectPiki';
const DISCORD_INVITATION_URL = 'https://discord.gg/CWKqYMePX8';

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

const Outer = styled.div`
  max-width: 800px;
  height: 100%;
  padding: 20px;
`;

const Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Body = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  padding: 10px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array: any): array is any[] =>
  typeof array === 'object' && array?.length !== undefined;

/**
 * Renders home page that displays information about projects.
 */
const Home = (): React.ReactElement => {
  const [pikmin2Response, setPikmin2Response] = useState<GithubAPIGetRepositoryContentResponse>();
  const [pikmin2Progress, setPikmin2Progress] = useState<PikminProgress>();

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
          if (data) {
            const latestRow = data[data.length - 1];
            if (isArray(latestRow)) {
              if (latestRow?.length >= 8) {
                setPikmin2Progress({
                  codeCountInPokos: parseInt(latestRow[0]),
                  codeCompletionInBytes: parseInt(latestRow[1]),
                  codeCompletionInPercentage: parseInt(latestRow[2]),
                  dataCountInTreasures: parseInt(latestRow[3]),
                  dataCompletionInBytes: parseInt(latestRow[4]),
                  dataCompletionInPercentage: parseInt(latestRow[5]),
                  sentence: latestRow[6],
                  createdAt: latestRow[7],
                });
              }
            }
          }
        },
      });
    }
  }, [pikmin2Response]);

  return (
    <App>
      <Outer>
        <Inner>
          <Header>
            <Text variant="h0" font="Pikmin" color="white">
              pikmin
            </Text>
            <Text variant="h0" font="Pikmin" color="pink">
              decomp
            </Text>
          </Header>
          <Body>
            <Text variant="h2" font="Pikmin" color="pink">
              this website is home to the pikmin decompilation projects
            </Text>
            <Text variant="h2" font="Pikmin" color="pink">
              the pikmin decompilation projects are ongoing projects to reverse-engineer the
              sourcecode for{' '}
              <Link urlString="https://github.com/projectPiki/pikmin" reverseColors>
                pikmin 1
              </Link>{' '}
              and{' '}
              <Link urlString="https://github.com/projectPiki/pikmin2" reverseColors>
                pikmin 2
              </Link>
            </Text>
          </Body>
          <Body>
            <Text variant="h2" font="Pikmin" color="white">
              pikmin 1 progress: TBD
            </Text>
            <Text variant="h2" font="Pikmin" color="white">
              pikmin 2 progress: {pikmin2Progress?.sentence}
            </Text>
          </Body>
          <Footer>
            <Image
              src="/assets/github.png"
              alt="github logo"
              link={GITHUB_ORGANIZATION_URL}
              size="large"
            />
            <Image
              src="/assets/discord.png"
              alt="discord logo"
              link={DISCORD_INVITATION_URL}
              size="large"
            />
          </Footer>
        </Inner>
      </Outer>
    </App>
  );
};

export default Home;
