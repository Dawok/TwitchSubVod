import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { FiSearch } from 'react-icons/fi';

import api from '../../services/api';

import { Container, AnimationContainer } from './styles';
import VodGallery from '../../components/VodGallery';
import LinkBox from '../../components/LinkBox';
import Footer from '../../components/Footer';

interface TwitchVideoProps {
  videos: Array<{
    broadcast_id: number;
    channel: {
      display_name: string;
      description: string;
      followers: number;
      logo: string;
      video_banner: string;
    };
    thumbnails: {
      large: Array<{ url: string }>;
    };
  }>;
}

const Home: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_TRACKING}`, {
      testMode: process.env.NODE_ENV === 'test',
    });
    ReactGA.pageview('/');
  }, []);

  const [username, setUsername] = useState('');
  const [usernameId, setUsernameId] = useState('');
  const [twitchData, setTwitchData] = useState<TwitchVideoProps>();

  const handleSubmit = () => {
    try {
      api.get(`users?login=${username}`).then((response) => {
        api
          .get(`channels/${response.data.users[0]._id}/videos?limit=100`)
          .then((response) => {
            setTwitchData(response.data);
          });

        setUsernameId(response.data.users[0]._id);

        ReactGA.event({
          category: 'SearchedUserForDeletedVod',
          action: `${username}`,
        });
      });
    } catch (err) {
      console.log(err);
    }

    (usernameId || twitchData) && console.log(usernameId, twitchData);
  };

  return (
    <Container>
      <AnimationContainer>
        <h1>Twitch Sub Vod</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            name="username"
            aria-label="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            placeholder="Streamer Username"
          />
          <button type="submit" aria-label="submit" onClick={handleSubmit}>
            <FiSearch size={14} />
            Search
          </button>
        </form>

        <LinkBox clips />
        <LinkBox vods />
        <LinkBox download />

        {twitchData && (
          <>
            <VodGallery data={twitchData.videos} />
          </>
        )}
      </AnimationContainer>
      <Footer />
    </Container>
  );
};

export default Home;
