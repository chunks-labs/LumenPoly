import { useCallback, useRef, useState } from 'react';
import { useGameStore } from '../store/store';
export function useFreighter() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'missing' | 'error'>('idle');
  const [error, setError] = useState('');
  const busy = useRef(false);
  const generation = useRef(0);
  const setAddress = useGameStore(state => state.setAddress);
  const connect = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    const request = ++generation.current;
    setStatus('connecting'); setError('');
    try {
      const api = await import('@stellar/freighter-api');
      const connected = await api.isConnected();
      if (request !== generation.current) return;
      if (!connected.isConnected) { setStatus('missing'); return; }
      const response = await api.requestAccess();
      if (request !== generation.current) return;
      if (response.error || !/^G[A-Z2-7]{55}$/.test(response.address ?? '')) {
        throw new Error('Connection was not approved. You can retry or keep playing as a guest.');
      }
      setAddress(response.address); setStatus('idle');
    } catch (cause) {
      if (request !== generation.current) return;
      setError(cause instanceof Error ? cause.message : 'Could not connect. Please try again.');
      setStatus('error');
    } finally { if (request === generation.current) busy.current = false; }
  }, [setAddress]);
  const disconnect = useCallback(() => {
    generation.current++; busy.current = false; setAddress(null); setStatus('idle'); setError('');
  }, [setAddress]);
  return { connect, disconnect, status, error };
}
