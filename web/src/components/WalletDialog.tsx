import { Modal } from './Modal';
import { Icon } from './Icon';
import { useFreighter } from '../hooks/useFreighter';
import { useGameStore } from '../store/store';
export function WalletDialog({ onClose }: { onClose: () => void }) {
  const address = useGameStore((state) => state.address);
  const { connect, disconnect, status, error } = useFreighter();
  return (
    <Modal title={address ? 'Your wallet' : 'Connect on your terms'} onClose={onClose}>
      <div className="dialog-emblem">
        <Icon name="wallet" size={30} />
      </div>
      <p className="muted">
        Practice is always available without a wallet. Connecting only shares your public address;
        it does not fund this game or sign a transaction.
      </p>
      {address ? (
        <>
          <p className="address-block">{address}</p>
          <button className="button secondary full" onClick={disconnect}>
            Disconnect from this app
          </button>
        </>
      ) : (
        <>
          <button
            className="button primary full"
            onClick={connect}
            disabled={status === 'connecting'}
          >
            {status === 'connecting' ? 'Waiting for Freighter…' : 'Connect Freighter'}
            <Icon name="arrow" />
          </button>
          {status === 'missing' && (
            <p role="status" className="notice">
              Freighter was not detected.{' '}
              <a href="https://www.freighter.app/" target="_blank" rel="noreferrer">
                Get the extension <Icon name="external" size={14} />
              </a>
              , then retry.
            </p>
          )}
          {error && (
            <p role="alert" className="notice">
              {error}
            </p>
          )}
          <button className="text-button full" onClick={onClose}>
            Continue as a guest
          </button>
        </>
      )}
      <p className="fine-print">
        This release uses simulated XLM. On-chain gameplay is not enabled.
      </p>
    </Modal>
  );
}
