import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';

interface Alert {
  id: string;
  term: string;
  email: boolean;
  whatsapp: boolean;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [email, setEmail] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim()) return;

    const newAlert: Alert = {
      id: Date.now().toString(),
      term: newTerm.trim(),
      email,
      whatsapp
    };

    setAlerts([...alerts, newAlert]);
    setNewTerm('');
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Configure alertas para ser notificado quando novos editais relacionados aos seus interesses forem publicados.
      </p>

      <form onSubmit={handleAddAlert} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Digite um termo para monitorar (ex: agricultura familiar)"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!newTerm.trim()}>
            Adicionar Alerta
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={email}
              onCheckedChange={setEmail}
              id="email-notifications"
            />
            <label htmlFor="email-notifications" className="text-sm">
              E-mail
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={whatsapp}
              onCheckedChange={setWhatsapp}
              id="whatsapp-notifications"
            />
            <label htmlFor="whatsapp-notifications" className="text-sm">
              WhatsApp
            </label>
          </div>
        </div>
      </form>

      {alerts.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Seus alertas ativos:</h3>
          <div className="divide-y divide-gray-100 rounded-md border">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-3"
              >
                <div>
                  <p className="font-medium">{alert.term}</p>
                  <p className="text-sm text-muted-foreground">
                    Notificações: {[
                      alert.email && 'E-mail',
                      alert.whatsapp && 'WhatsApp'
                    ].filter(Boolean).join(', ')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAlert(alert.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Você ainda não tem alertas configurados.
        </p>
      )}
    </div>
  );
};

export default AlertSystem;
