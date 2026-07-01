import { useState, useEffect } from 'react';
import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  signTransaction
} from '@stellar/freighter-api';
import { useGameStore } from '../store/store';

export function useFreighter() {
  const [hasFreighter, setHasFreighter] = useState(false);
  const setAddress = useGameStore((state) => state.setAddress);

  useEffect(() => {
    async function checkFreighter() {
      if (await isConnected()) {
        setHasFreighter(true);
        if (await isAllowed()) {
          const userAddress = await getAddress();
          setAddress(userAddress.address);
        }
      }
    }
    checkFreighter();
  }, [setAddress]);

  const connect = async () => {
    if (!hasFreighter) {
      alert('Please install the Freighter wallet extension.');
      return;
    }
    try {
      const pubKey = await requestAccess();
      setAddress(pubKey.address);
    } catch (e) {
      console.error('User rejected connection', e);
    }
  };

  const signStellarTx = async (xdr: string, network: string = 'TESTNET') => {
    try {
      return await signTransaction(xdr, { networkPassphrase: network });
    } catch (e) {
      console.error('Failed to sign transaction', e);
      throw e;
    }
  };

  return { hasFreighter, connect, signStellarTx };
}
