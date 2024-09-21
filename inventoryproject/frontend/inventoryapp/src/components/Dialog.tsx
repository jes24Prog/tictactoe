
import { Dialog } from '@reach/dialog';
import "@reach/dialog/styles.css";
import './styles/Dialog.css'; 

interface IDialog{
    content: () => JSX.Element,
    open: boolean,
    close: () => void
}

export const ShowDialog = ({content, open, close} : IDialog) => {
    return (
        <div className="dialog">
            <Dialog isOpen={open} onDismiss={close}>
                {content()}
            </Dialog>
        </div>
    );
};
